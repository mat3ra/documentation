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

    // Beta runs on the default Cloud Run hostname; a mat3ra.com subdomain
    // replaces this before general availability.
    var DEFAULT_ENDPOINT = "https://docs-agent-mmrcocqy3a-uc.a.run.app";
    var SESSION_KEY = "docsAgentSession";
    // Following a source link is a normal part of reading an answer, and the
    // page reloads when it happens. The conversation therefore has to outlive
    // the page, or every citation would end the exchange that produced it.
    var SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
    var SESSION_MAX_MESSAGES = 20; // matches the service's own conversation cap
    var SESSION_MAX_CHARS = 40000;
    var ENDPOINT_OVERRIDE_KEY = "docsAgentEndpoint"; // localStorage, for local development
    var MAX_QUESTION_CHARS = 4000;

    // ---------------------------------------------------------------- markdown

    // Bare URLs are matched too: the model lists its sources as plain URLs, and
    // a source you cannot click is not much of a citation.
    var INLINE_PATTERN =
        /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)\s]+\))|(https:\/\/[^\s)\],<>"']+)/;

    // Product term -> documentation page, fetched from the service. Built from
    // the index there, so it can only ever name a page that exists.
    var glossary = {};

    var CANONICAL_DOCS_ORIGIN = "https://docs.mat3ra.com";
    // When the widget runs on a documentation build that is not production — a
    // deploy preview, or a local server — citations should stay on the build
    // being read. The corpus stores canonical production URLs, so following one
    // otherwise leaves the preview entirely, which loses the conversation with
    // it: storage is per-origin. Set only where the widget mounts itself onto a
    // documentation site; the platform shell serves no documentation and must
    // keep sending readers to the real thing.
    var docsOrigin = "";

    /** Append inline Markdown (code, bold, links, bare URLs) to a parent node. */
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
                parent.appendChild(renderEmphasis(token.slice(2, -2)));
            } else if (token.charAt(0) === "[") {
                var split = token.indexOf("](");
                parent.appendChild(safeLink(token.slice(split + 2, -1), token.slice(1, split)));
            } else {
                // A bare URL. Trailing sentence punctuation is not part of it.
                var url = token.replace(/[.,;:]+$/, "");
                parent.appendChild(safeLink(url, url));
                text = text.slice(match.index + url.length);
                continue;
            }
            text = text.slice(match.index + token.length);
        }
    }

    /**
     * Emphasised text, linked to the page that defines it when the glossary
     * knows the term.
     *
     * Answers name platform features in bold — Materials Bank, Materials
     * Designer — and those are exactly the things a reader wants to open. The
     * mapping comes from the service's index rather than from the model, so a
     * link here can never point at a page that does not exist.
     */
    function renderEmphasis(label) {
        var href = glossary[label.trim().toLowerCase()];
        if (!href) {
            var strong = document.createElement("strong");
            strong.textContent = label;
            return strong;
        }
        var link = safeLink(href, label);
        if (link.tagName !== "A") return link;
        link.className = "docs-agent-term";
        link.title = "Open the documentation for " + label;
        var bold = document.createElement("strong");
        bold.appendChild(link);
        return bold;
    }

    /** Point a canonical documentation URL at the build currently being read. */
    function localDocsUrl(href) {
        if (!docsOrigin || docsOrigin === CANONICAL_DOCS_ORIGIN) return href;
        if (href.indexOf(CANONICAL_DOCS_ORIGIN + "/") !== 0) return href;
        return docsOrigin + href.slice(CANONICAL_DOCS_ORIGIN.length);
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
        anchor.href = localDocsUrl(href);
        anchor.textContent = label;
        // Navigate in place: a documentation link is the continuation of the
        // answer, not a detour, and opening tabs behind the reader is a habit
        // the documentation itself does not have. The conversation survives the
        // navigation because it is stored — see the session functions below.
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

    // ---------------------------------------------------------------- branding

    // The Mat3ra mark, inlined and drawn in currentColor so it works on the
    // purple launcher and on the panel header without shipping two assets or
    // depending on a path that only exists on the documentation site.
    var LOGO =
        '<svg class="docs-agent-logo" viewBox="0 0 512 512" width="14" height="14" aria-hidden="true" focusable="false">' +
        '<circle cx="256" cy="256" r="80" fill="currentColor"/>' +
        '<path fill="currentColor" d="M334 100.056C334 50.8718 373.847 11 423 11C472.153 11 512 50.8718 512 100.056C512 130.306 480.115 171.982 480.115 171.982C480.115 171.982 427.327 236.133 427.327 256.326C427.327 276.516 456.851 312.743 480.115 341.285C497.341 362.431 512 383.184 512 411.944C512 461.128 472.153 501 423 501C373.847 501 334 461.128 334 411.944C334 384.78 349.322 361.543 365.887 341.285C389.152 312.74 418.674 276.516 418.674 256.326C418.674 236.289 366.784 171.982 366.784 171.982C366.784 171.982 334 131.672 334 100.056Z"/>' +
        '<path fill="currentColor" d="M0 100.056C0 50.8718 39.8467 11 89 11C138.153 11 178 50.8718 178 100.056C178 130.306 146.115 171.982 146.115 171.982C146.115 171.982 93.3276 236.133 93.3276 256.326C93.3276 276.516 122.851 312.743 146.115 341.285C163.341 362.431 178 383.184 178 411.944C178 461.128 138.153 501 89 501C39.8467 501 0 461.128 0 411.944C0 384.78 15.3226 361.543 31.8867 341.285C55.1519 312.74 84.6738 276.516 84.6738 256.326C84.6738 236.289 32.7845 171.982 32.7845 171.982C32.7845 171.982 0 131.672 0 100.056Z"/>' +
        "</svg>";

    /** A label preceded by the mark. Built as nodes; the SVG is our own markup. */
    function brandedLabel(text) {
        var fragment = document.createDocumentFragment();
        var holder = document.createElement("span");
        holder.className = "docs-agent-mark";
        holder.innerHTML = LOGO; // trusted constant above, never model output
        fragment.appendChild(holder);
        fragment.appendChild(document.createTextNode(text));
        return fragment;
    }

    // ------------------------------------------------------------------ widget

    function DocsAgentWidget(root, options) {
        this.endpoint = (options && options.endpoint) || resolveEndpoint();
        this.tokenProvider = (options && options.tokenProvider) || null;
        if (options && options.docsOrigin) docsOrigin = options.docsOrigin;
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
        title.appendChild(brandedLabel("Ask AI"));
        // A conversation that survives navigation also has to be endable.
        var clear = document.createElement("button");
        clear.type = "button";
        clear.className = "docs-agent-clear";
        clear.textContent = "New chat";
        var close = document.createElement("button");
        close.type = "button";
        close.className = "docs-agent-close";
        close.setAttribute("aria-label", "Close");
        close.textContent = "×";
        var controls = document.createElement("div");
        controls.className = "docs-agent-controls";
        controls.appendChild(clear);
        controls.appendChild(close);
        header.appendChild(title);
        header.appendChild(controls);

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
            "Answers are generated from the documentation and can be wrong. Questions are " +
            "logged to improve the assistant, and this conversation is kept in your browser " +
            "until you start a new chat.";

        panel.appendChild(header);
        panel.appendChild(log);
        panel.appendChild(form);
        panel.appendChild(footer);

        var launcher = document.createElement("button");
        launcher.type = "button";
        launcher.className = "docs-agent-launcher";
        launcher.appendChild(brandedLabel("Ask AI"));
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
        clear.addEventListener("click", function () {
            self.clearSession();
            self.log.textContent = "";
            self.greet();
            self.saveSession();
            self.input.focus();
        });

        // Redraw the stored conversation once the glossary is available, so
        // restored answers get the same links a fresh one would.
        this.loadGlossary().then(function () {
            self.restoreSession();
        });
    };

    /** Fetch the term-to-page map once. Answers render fine without it. */
    DocsAgentWidget.prototype.loadGlossary = function () {
        return fetch(this.endpoint + "/glossary")
            .then(function (response) {
                return response.ok ? response.json() : null;
            })
            .then(function (data) {
                if (data && data.terms) glossary = data.terms;
            })
            .catch(function () {
                /* Terms simply stay unlinked. */
            });
    };

    // ------------------------------------------------------------------ session

    /**
     * The conversation, kept in the browser so it survives navigation.
     *
     * Answers cite documentation pages and those links now open in place, so
     * without this every citation would discard the exchange that produced it.
     * Nothing is sent anywhere by storing it: this is the same text the page
     * already displays, on the reader's own machine, and the panel offers a way
     * to clear it.
     */
    DocsAgentWidget.prototype.saveSession = function () {
        try {
            var messages = this.messages.slice(-SESSION_MAX_MESSAGES);
            while (
                messages.length &&
                messages.reduce(function (total, m) {
                    return total + m.content.length;
                }, 0) > SESSION_MAX_CHARS
            ) {
                messages.shift();
            }
            global.localStorage.setItem(
                SESSION_KEY,
                JSON.stringify({
                    version: 1,
                    updated: Date.now(),
                    open: !this.panel.hidden,
                    messages: messages,
                })
            );
        } catch (error) {
            /* Storage full or disabled: the widget still works for this page. */
        }
    };

    DocsAgentWidget.prototype.readSession = function () {
        try {
            var stored = JSON.parse(global.localStorage.getItem(SESSION_KEY) || "null");
            if (!stored || stored.version !== 1 || !Array.isArray(stored.messages)) return null;
            if (Date.now() - (stored.updated || 0) > SESSION_MAX_AGE_MS) {
                this.clearSession();
                return null;
            }
            return stored;
        } catch (error) {
            return null;
        }
    };

    DocsAgentWidget.prototype.clearSession = function () {
        this.messages = [];
        try {
            global.localStorage.removeItem(SESSION_KEY);
        } catch (error) {
            /* Nothing to clear. */
        }
    };

    /** Redraw a stored conversation and reopen the panel if it was open. */
    DocsAgentWidget.prototype.restoreSession = function () {
        var stored = this.readSession();
        if (!stored || !stored.messages.length) {
            this.greet();
            return;
        }
        this.messages = stored.messages;
        var self = this;
        stored.messages.forEach(function (message) {
            if (message.role === "user") {
                self.bubble("user", message.content);
            } else {
                renderMarkdown(self.bubble("assistant", ""), message.content);
            }
        });
        this.scroll();
        if (stored.open) this.toggle(true);
    };

    DocsAgentWidget.prototype.toggle = function (open) {
        this.panel.hidden = !open;
        this.launcher.setAttribute("aria-expanded", String(open));
        if (open) this.input.focus();
        else this.launcher.focus();
        // Remember whether it was open, so following a link does not close it.
        this.saveSession();
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
        this.saveSession();

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
                self.saveSession();
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
                // Self-mounting means this page *is* a documentation build, so
                // citations should stay on it rather than jumping to production.
                DocsAgent.mount(host, { endpoint: endpoint, docsOrigin: global.location.origin });
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
