/**
 * Ask AI — the documentation assistant widget.
 *
 * Written as a framework-free module so the platform application can mount the
 * same code inside its own shell:
 *
 *     DocsAgent.mount(element, { endpoint, tokenProvider });
 *
 * On the documentation site it mounts itself into the page (see the bottom of
 * this file). It never assumes MkDocs.
 *
 * Model output is rendered by building DOM nodes and setting textContent —
 * `innerHTML` is never used for anything the model or the corpus produced. That
 * makes injection structurally impossible rather than filtered, which is why
 * this file carries a small Markdown renderer instead of pulling in a Markdown
 * parser plus a sanitiser.
 */
(function (global) {
    "use strict";

    var DEFAULT_ENDPOINT = "https://docs-agent.mat3ra.com";
    var ENDPOINT_OVERRIDE_KEY = "docsAgentEndpoint"; // localStorage, for local development
    var MAX_QUESTION_CHARS = 4000;

    // ---------------------------------------------------------------- markdown

    var INLINE_PATTERN = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)\s]+\))/;

    /** Append inline Markdown (code, bold, links) to a parent node. */
    function renderInline(parent, text) {
        while (text) {
            var match = INLINE_PATTERN.exec(text);
            if (!match) {
                parent.appendChild(document.createTextNode(text));
                return;
            }
            if (match.index > 0) {
                parent.appendChild(document.createTextNode(text.slice(0, match.index)));
            }
            var token = match[0];
            if (token.charAt(0) === "`") {
                var code = document.createElement("code");
                code.textContent = token.slice(1, -1);
                parent.appendChild(code);
            } else if (token.charAt(0) === "*") {
                var strong = document.createElement("strong");
                strong.textContent = token.slice(2, -2);
                parent.appendChild(strong);
            } else {
                var split = token.indexOf("](");
                var label = token.slice(1, split);
                var href = token.slice(split + 2, -1);
                parent.appendChild(safeLink(href, label));
            }
            text = text.slice(match.index + token.length);
        }
    }

    /**
     * A link the model asked for. Only https targets become anchors; anything
     * else (javascript:, data:, a relative path) is rendered as plain text, so
     * a poisoned URL in the corpus cannot become a clickable trap.
     */
    function safeLink(href, label) {
        if (!/^https:\/\//i.test(href)) {
            return document.createTextNode(label + " (" + href + ")");
        }
        var anchor = document.createElement("a");
        anchor.href = href;
        anchor.textContent = label;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        return anchor;
    }

    /** Render the Markdown subset the agent produces into `target`. */
    function renderMarkdown(target, markdown) {
        target.textContent = "";
        var lines = markdown.split("\n");
        var index = 0;
        var list = null;

        function closeList() {
            list = null;
        }

        while (index < lines.length) {
            var line = lines[index];

            if (/^```/.test(line)) {
                closeList();
                var buffer = [];
                index += 1;
                while (index < lines.length && !/^```/.test(lines[index])) {
                    buffer.push(lines[index]);
                    index += 1;
                }
                index += 1;
                var pre = document.createElement("pre");
                var codeBlock = document.createElement("code");
                codeBlock.textContent = buffer.join("\n");
                pre.appendChild(codeBlock);
                target.appendChild(pre);
                continue;
            }

            var heading = /^(#{1,6})\s+(.*)$/.exec(line);
            if (heading) {
                closeList();
                var level = Math.min(heading[1].length + 2, 6); // never outrank the page's own h1/h2
                var headingNode = document.createElement("h" + level);
                renderInline(headingNode, heading[2]);
                target.appendChild(headingNode);
                index += 1;
                continue;
            }

            var bullet = /^\s*[-*]\s+(.*)$/.exec(line);
            var numbered = /^\s*\d+\.\s+(.*)$/.exec(line);
            if (bullet || numbered) {
                var wanted = bullet ? "UL" : "OL";
                if (!list || list.tagName !== wanted) {
                    list = document.createElement(bullet ? "ul" : "ol");
                    target.appendChild(list);
                }
                var item = document.createElement("li");
                renderInline(item, (bullet || numbered)[1]);
                list.appendChild(item);
                index += 1;
                continue;
            }

            if (!line.trim()) {
                closeList();
                index += 1;
                continue;
            }

            closeList();
            var paragraph = document.createElement("p");
            renderInline(paragraph, line);
            target.appendChild(paragraph);
            index += 1;
        }
    }

    // --------------------------------------------------------------- streaming

    /** Read an SSE body, calling onEvent(name, data) per event. */
    function readEvents(response, onEvent) {
        var reader = response.body.getReader();
        var decoder = new TextDecoder();
        var buffer = "";

        function pump() {
            return reader.read().then(function (result) {
                if (result.done) return;
                buffer += decoder.decode(result.value, { stream: true });
                var blocks = buffer.split("\n\n");
                buffer = blocks.pop();
                blocks.forEach(function (block) {
                    var name = "";
                    var payload = "";
                    block.split("\n").forEach(function (line) {
                        if (line.indexOf("event: ") === 0) name = line.slice(7);
                        else if (line.indexOf("data: ") === 0) payload += line.slice(6);
                    });
                    if (!name) return;
                    var data = {};
                    try {
                        data = payload ? JSON.parse(payload) : {};
                    } catch (error) {
                        return;
                    }
                    onEvent(name, data);
                });
                return pump();
            });
        }
        return pump();
    }

    // ------------------------------------------------------------------ widget

    function DocsAgentWidget(root, options) {
        this.endpoint = (options && options.endpoint) || resolveEndpoint();
        this.tokenProvider = (options && options.tokenProvider) || null;
        this.messages = []; // conversation, in memory only
        this.busy = false;
        this.build(root);
    }

    DocsAgentWidget.prototype.build = function (root) {
        var self = this;

        var panel = document.createElement("section");
        panel.className = "docs-agent-panel";
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-label", "Ask the documentation assistant");
        panel.hidden = true;

        var header = document.createElement("header");
        var title = document.createElement("h2");
        title.textContent = "Ask AI";
        var close = document.createElement("button");
        close.type = "button";
        close.className = "docs-agent-close";
        close.setAttribute("aria-label", "Close");
        close.textContent = "×";
        header.appendChild(title);
        header.appendChild(close);

        var log = document.createElement("div");
        log.className = "docs-agent-log";
        log.setAttribute("aria-live", "polite");

        var form = document.createElement("form");
        form.className = "docs-agent-form";
        var input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Ask about the Mat3ra platform…";
        input.setAttribute("aria-label", "Your question");
        input.maxLength = MAX_QUESTION_CHARS;
        var send = document.createElement("button");
        send.type = "submit";
        send.textContent = "Ask";
        form.appendChild(input);
        form.appendChild(send);

        var footer = document.createElement("p");
        footer.className = "docs-agent-footer";
        footer.textContent =
            "Answers are generated from the documentation and can be wrong. Questions are logged to improve the assistant.";

        panel.appendChild(header);
        panel.appendChild(log);
        panel.appendChild(form);
        panel.appendChild(footer);

        var launcher = document.createElement("button");
        launcher.type = "button";
        launcher.className = "docs-agent-launcher";
        launcher.textContent = "Ask AI";
        launcher.setAttribute("aria-expanded", "false");

        root.appendChild(launcher);
        root.appendChild(panel);

        this.panel = panel;
        this.log = log;
        this.input = input;
        this.send = send;
        this.launcher = launcher;

        launcher.addEventListener("click", function () {
            self.toggle(panel.hidden);
        });
        close.addEventListener("click", function () {
            self.toggle(false);
        });
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var question = input.value.trim();
            if (question && !self.busy) {
                input.value = "";
                self.ask(question);
            }
        });
        panel.addEventListener("keydown", function (event) {
            if (event.key === "Escape") self.toggle(false);
        });

        this.greet();
    };

    DocsAgentWidget.prototype.toggle = function (open) {
        this.panel.hidden = !open;
        this.launcher.setAttribute("aria-expanded", String(open));
        if (open) this.input.focus();
        else this.launcher.focus();
    };

    DocsAgentWidget.prototype.greet = function () {
        var intro = document.createElement("div");
        intro.className = "docs-agent-message docs-agent-assistant";
        renderMarkdown(
            intro,
            "Ask a question about the Mat3ra platform. Answers come from this documentation, with links to the pages used."
        );
        this.log.appendChild(intro);
    };

    DocsAgentWidget.prototype.bubble = function (role, text) {
        var node = document.createElement("div");
        node.className = "docs-agent-message docs-agent-" + role;
        if (text) node.textContent = text;
        this.log.appendChild(node);
        this.scroll();
        return node;
    };

    DocsAgentWidget.prototype.scroll = function () {
        this.log.scrollTop = this.log.scrollHeight;
    };

    DocsAgentWidget.prototype.ask = function (question) {
        var self = this;
        this.busy = true;
        this.send.disabled = true;
        this.bubble("user", question);
        this.messages.push({ role: "user", content: question });

        var answerNode = this.bubble("assistant", "");
        var statusNode = document.createElement("p");
        statusNode.className = "docs-agent-status";
        statusNode.textContent = "Searching the documentation…";
        answerNode.appendChild(statusNode);

        var answer = "";
        var pending = null;

        function draw() {
            pending = null;
            renderMarkdown(answerNode, answer);
            self.scroll();
        }

        Promise.resolve(this.tokenProvider ? this.tokenProvider() : null)
            .then(function (token) {
                var headers = { "Content-Type": "application/json" };
                if (token) headers.Authorization = "Bearer " + token;
                return fetch(self.endpoint + "/chat", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ messages: self.messages }),
                });
            })
            .then(function (response) {
                if (!response.ok || !response.body) {
                    throw new Error("http " + response.status);
                }
                return readEvents(response, function (name, data) {
                    if (name === "status") {
                        statusNode.textContent = data.query
                            ? "Searching the documentation: " + data.query
                            : "Searching the documentation…";
                    } else if (name === "text") {
                        if (statusNode.parentNode) statusNode.remove();
                        answer += data.text || "";
                        if (!pending) pending = requestAnimationFrame(draw);
                    } else if (name === "sources") {
                        if (pending) cancelAnimationFrame(pending);
                        draw();
                        self.renderSources(answerNode, data.urls || [], answer);
                    } else if (name === "error") {
                        if (statusNode.parentNode) statusNode.remove();
                        answer += "\n\n" + (data.message || "Something went wrong.");
                        draw();
                    }
                });
            })
            .catch(function () {
                if (statusNode.parentNode) statusNode.remove();
                answer +=
                    "\n\nThe assistant is unavailable right now. The documentation search box above still works.";
                draw();
            })
            .then(function () {
                if (answer) self.messages.push({ role: "assistant", content: answer });
                self.busy = false;
                self.send.disabled = false;
                self.input.focus();
            });
    };

    /**
     * Show the pages retrieval touched — but only when the answer has not
     * already cited its own.
     *
     * These two lists are not the same thing: the answer cites the pages the
     * model *used*, while this event carries everything retrieval *returned*,
     * which routinely includes near-misses the model correctly ignored.
     * Printing both duplicates the useful list and dresses the near-misses up
     * as sources, so the answer's own citations win whenever it has them.
     */
    DocsAgentWidget.prototype.renderSources = function (parent, urls, answer) {
        if (!urls.length || /(^|\n)\s*(#+\s*)?\**sources\**\s*:?/i.test(answer)) return;
        var wrapper = document.createElement("div");
        wrapper.className = "docs-agent-sources";
        var label = document.createElement("p");
        label.textContent = "Pages searched";
        var list = document.createElement("ul");
        urls.forEach(function (url) {
            var item = document.createElement("li");
            item.appendChild(safeLink(url, url.replace(/^https:\/\/docs\.mat3ra\.com\//, "")));
            list.appendChild(item);
        });
        wrapper.appendChild(label);
        wrapper.appendChild(list);
        parent.appendChild(wrapper);
        this.scroll();
    };

    // ------------------------------------------------------------------ mounting

    function resolveEndpoint() {
        try {
            return global.localStorage.getItem(ENDPOINT_OVERRIDE_KEY) || DEFAULT_ENDPOINT;
        } catch (error) {
            return DEFAULT_ENDPOINT;
        }
    }

    var DocsAgent = {
        mount: function (element, options) {
            return new DocsAgentWidget(element, options || {});
        },
    };

    /**
     * Auto-mount on the documentation site, but only once the service answers
     * its health check. A documentation page must never show a launcher that
     * leads nowhere, and must never break because the assistant is down.
     */
    function autoMount() {
        var endpoint = resolveEndpoint();
        fetch(endpoint + "/health", { method: "GET" })
            .then(function (response) {
                if (!response.ok) throw new Error("unhealthy");
                var host = document.createElement("div");
                host.className = "docs-agent";
                document.body.appendChild(host);
                DocsAgent.mount(host, { endpoint: endpoint });
            })
            .catch(function () {
                /* Service unavailable: leave the page exactly as it was. */
            });
    }

    global.DocsAgent = DocsAgent;
    global.DocsAgent._internals = { renderMarkdown: renderMarkdown, safeLink: safeLink };

    if (typeof document !== "undefined" && !global.DOCS_AGENT_NO_AUTOMOUNT) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", autoMount);
        } else {
            autoMount();
        }
    }
})(typeof window !== "undefined" ? window : this);
