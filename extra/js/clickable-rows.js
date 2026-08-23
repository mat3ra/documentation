/**
 * Make table rows clickable — when a row contains a single link,
 * clicking anywhere on the row navigates to that link.
 */
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".md-typeset table tbody tr").forEach(function (row) {
        var links = row.querySelectorAll("a:not(.footnote-ref)");
        if (links.length === 1) {
            row.style.cursor = "pointer";
            row.addEventListener("click", function (e) {
                if (e.target.tagName !== "A") {
                    links[0].click();
                }
            });
        }
    });
});
