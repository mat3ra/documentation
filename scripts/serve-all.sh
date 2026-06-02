#!/bin/bash
# Build and serve all documentation sites locally.
#
# Usage:
#   ./scripts/serve-all.sh          # build + serve on localhost:8000
#   ./scripts/serve-all.sh --build  # build only, no server
#
# Cross-site links automatically resolve to localhost for local testing.

set -euo pipefail
cd "$(dirname "$0")/.."

# Activate venv if present
if [ -f .venv/bin/activate ]; then
    source .venv/bin/activate
elif [ -f venv/bin/activate ]; then
    source venv/bin/activate
fi

PORT="${PORT:-8000}"
LOCAL_BASE="http://localhost:${PORT}"

# Create local config overrides in project root (relative paths stay valid)
make_local_config() {
    local src="$1"
    local dst=".local-$(basename "$1")"
    sed \
        -e "s|guide_url: https://docs.mat3ra.com/guide|guide_url: ${LOCAL_BASE}/guide|" \
        -e "s|interface_url: https://docs.mat3ra.com/interface|interface_url: ${LOCAL_BASE}/interface|" \
        -e "s|reference_url: https://docs.mat3ra.com/reference|reference_url: ${LOCAL_BASE}/reference|" \
        -e "s|resources_url: https://docs.mat3ra.com/resources|resources_url: ${LOCAL_BASE}/resources|" \
        -e "s|developers_url: https://docs.mat3ra.com/developers|developers_url: ${LOCAL_BASE}/developers|" \
        -e "s|cli_url: https://docs.mat3ra.com/command-line|cli_url: ${LOCAL_BASE}/command-line|" \
        -e "s|data_url: https://docs.mat3ra.com/standards|data_url: ${LOCAL_BASE}/standards|" \
        -e "s|guide_url: https://docs.mat3ra.com$|guide_url: ${LOCAL_BASE}|" \
        -e "s|interface_url: https://docs.mat3ra.com$|interface_url: ${LOCAL_BASE}|" \
        -e "s|reference_url: https://docs.mat3ra.com$|reference_url: ${LOCAL_BASE}|" \
        -e "s|resources_url: https://docs.mat3ra.com$|resources_url: ${LOCAL_BASE}|" \
        -e "s|developers_url: https://docs.mat3ra.com$|developers_url: ${LOCAL_BASE}|" \
        -e "s|cli_url: https://docs.mat3ra.com$|cli_url: ${LOCAL_BASE}|" \
        -e "s|data_url: https://docs.mat3ra.com$|data_url: ${LOCAL_BASE}|" \
        "$src" > "$dst"
    echo "$dst"
}

cleanup() {
    rm -f .local-mkdocs.yml .local-mkdocs-guide.yml .local-mkdocs-interface.yml .local-mkdocs-concepts.yml .local-mkdocs-resources.yml .local-mkdocs-developers.yml .local-mkdocs-cli.yml .local-mkdocs-standards.yml
}
trap cleanup EXIT

LOCAL_LEGACY=$(make_local_config mkdocs.yml)
LOCAL_GUIDE=$(make_local_config mkdocs-guide.yml)
LOCAL_INTERFACE=$(make_local_config mkdocs-interface.yml)
LOCAL_CONCEPTS=$(make_local_config mkdocs-concepts.yml)
LOCAL_RESOURCES=$(make_local_config mkdocs-resources.yml)
LOCAL_DEVELOPERS=$(make_local_config mkdocs-developers.yml)
LOCAL_CLI=$(make_local_config mkdocs-cli.yml)
LOCAL_STANDARDS=$(make_local_config mkdocs-standards.yml)

echo "=== Building legacy site (root) ==="
python -m mkdocs build -f "$LOCAL_LEGACY"

echo ""
echo "=== Building Tutorials → site/guide/ ==="
python -m mkdocs build -f "$LOCAL_GUIDE" -d site/guide

echo ""
echo "=== Building User Interface → site/interface/ ==="
python -m mkdocs build -f "$LOCAL_INTERFACE" -d site/interface

echo ""
echo "=== Building Concepts → site/reference/ ==="
python -m mkdocs build -f "$LOCAL_CONCEPTS" -d site/reference

echo ""
echo "=== Building Resources → site/resources/ ==="
python -m mkdocs build -f "$LOCAL_RESOURCES" -d site/resources

echo ""
echo "=== Building Developers → site/developers/ ==="
python -m mkdocs build -f "$LOCAL_DEVELOPERS" -d site/developers

echo ""
echo "=== Building Command-Line Interface → site/command-line/ ==="
python -m mkdocs build -f "$LOCAL_CLI" -d site/command-line

echo ""
echo "=== Building Data Standards → site/standards/ ==="
python -m mkdocs build -f "$LOCAL_STANDARDS" -d site/standards

# Each subsite's homepage is built as index-<site>/index.html.
# Copy to root, fixing relative paths (base ".." → "." since we move up one level).
fix_and_copy_homepage() {
    local src="$1"
    local dst="$2"
    if [ -f "$src" ]; then
        sed \
            -e 's|"base": ".."|"base": "."|' \
            -e 's|"\.\./assets/|"./assets/|g' \
            -e 's|"\.\./search/|"./search/|g' \
            -e 's|"\.\./extra/|"./extra/|g' \
            -e 's|"\.\./images/|"./images/|g' \
            -e 's|href="\.\./|href="./|g' \
            -e 's|src="\.\./|src="./|g' \
            "$src" > "$dst"
    fi
}
fix_and_copy_homepage site/guide/index-guide/index.html              site/guide/index.html
fix_and_copy_homepage site/interface/index-interface/index.html       site/interface/index.html
fix_and_copy_homepage site/reference/index-concepts/index.html       site/reference/index.html
fix_and_copy_homepage site/resources/index-resources/index.html      site/resources/index.html
fix_and_copy_homepage site/developers/index-developers/index.html    site/developers/index.html
fix_and_copy_homepage site/command-line/index-cli/index.html                  site/command-line/index.html
fix_and_copy_homepage site/standards/index-standards/index.html      site/standards/index.html

echo ""
echo "Build complete. Output in site/"
echo "  site/            → legacy full site"
echo "  site/guide/      → Tutorials"
echo "  site/interface/  → User Interface"
echo "  site/reference/  → Concepts & Reference"
echo "  site/resources/  → Resources / Infrastructure"
echo "  site/developers/ → Developers"
echo "  site/command-line/        → Command-Line Interface"
echo "  site/standards/  → Data Standards"

if [ "${1:-}" = "--build" ]; then
    exit 0
fi

echo ""
echo "Starting local server on ${LOCAL_BASE}"
echo "  ${LOCAL_BASE}/guide/"
echo "  ${LOCAL_BASE}/interface/"
echo "  ${LOCAL_BASE}/reference/"
echo "  ${LOCAL_BASE}/resources/"
echo "  ${LOCAL_BASE}/developers/"
echo "  ${LOCAL_BASE}/command-line/"
echo "  ${LOCAL_BASE}/standards/"
echo ""
echo "Cross-site links resolve to localhost. Press Ctrl+C to stop."
python -m http.server "$PORT" --directory site
