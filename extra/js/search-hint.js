/**
 * Cross-site search hint for MkDocs Material.
 *
 * On sub-sites (/guide/, /reference/, /dev/) the built-in search only
 * indexes pages belonging to that sub-site.  This script adds a small
 * hint below the search results telling the user they can search the
 * full documentation from the top-level site.
 */
(function () {
  "use strict";

  // Map of sub-site URL prefixes to their display names (from site_name in each mkdocs config)
  var subsites = {
    "/guide": "Tutorials",
    "/interface": "User Interface",
    "/reference": "Concepts & Reference",
    "/resources": "Platform Resources",
    "/developers": "Software Developers",
    "/command-line": "Command-Line Interface",
    "/standards": "Data Standards",
  };

  // Detect current sub-site
  var path = window.location.pathname;
  var siteLabel = null;
  var prefixes = Object.keys(subsites);
  for (var i = 0; i < prefixes.length; i++) {
    if (path.startsWith(prefixes[i])) {
      siteLabel = subsites[prefixes[i]];
      break;
    }
  }
  if (!siteLabel) return;  // On the root site — no hint needed

  // Root URL — works both in production and on localhost
  var rootUrl = window.location.origin + "/";

  // Wait for the search dialog to appear in the DOM.  MkDocs Material
  // creates it lazily, so we use a MutationObserver.
  var hintInjected = false;

  function injectHint(searchOutput) {
    if (hintInjected) return;
    hintInjected = true;

    var hint = document.createElement("div");
    hint.className = "md-search-result__hint";
    hint.style.cssText =
      "padding: 0.8rem 1rem; font-size: 0.7rem; color: var(--md-default-fg-color--light);" +
      "border-top: 1px solid var(--md-default-fg-color--lightest); text-align: center;";

    hint.innerHTML =
      "🔍 Search is limited to <strong>" + siteLabel + "</strong>. " +
      '<a href="' + rootUrl + '" style="color: var(--md-accent-fg-color);">' +
      "Search all documentation →</a>";

    searchOutput.appendChild(hint);
  }

  // Observe the document for the search result container
  var observer = new MutationObserver(function (mutations) {
    var searchOutput = document.querySelector(".md-search-result");
    if (searchOutput) {
      injectHint(searchOutput);
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Also try immediately in case it's already present
  var existing = document.querySelector(".md-search-result");
  if (existing) {
    injectHint(existing);
    observer.disconnect();
  }
})();
