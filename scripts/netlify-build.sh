#!/bin/bash
git submodule update --recursive --init
git lfs install
git lfs pull
# git LFS objects can alternatively be handled via environmental variables
# GIT_LFS_ENABLED=true and GIT_LFS_FETCH_INCLUDE
# https://answers.netlify.com/t/problem-checking-out-file-stored-in-git-lfs-on-github/103897/7

# pip packages are automatically installed by netlify
# if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

# On deploy previews, rewrite cross-site URLs to stay within the preview domain.
# On production, use the original configs with production URLs.
LEGACY_CFG="mkdocs.yml"
GUIDE_CFG="mkdocs-guide.yml"
INTERFACE_CFG="mkdocs-interface.yml"
CONCEPTS_CFG="mkdocs-concepts.yml"
RESOURCES_CFG="mkdocs-resources.yml"
DEVELOPERS_CFG="mkdocs-developers.yml"
CLI_CFG="mkdocs-cli.yml"
STANDARDS_CFG="mkdocs-standards.yml"

cleanup() {
    rm -f .preview-mkdocs.yml .preview-mkdocs-guide.yml .preview-mkdocs-interface.yml .preview-mkdocs-concepts.yml .preview-mkdocs-resources.yml .preview-mkdocs-developers.yml .preview-mkdocs-cli.yml .preview-mkdocs-standards.yml
}
trap cleanup EXIT

if [ "$CONTEXT" = "deploy-preview" ] || [ "$CONTEXT" = "branch-deploy" ]; then
    BASE_URL="${DEPLOY_PRIME_URL}"
    echo "=== Deploy preview detected: rewriting cross-site URLs to ${BASE_URL} ==="
    make_preview_config() {
        local src="$1"
        local dst=".preview-$(basename "$1")"
            sed \
            -e "s|guide_url: https://docs.mat3ra.com/guide|guide_url: ${BASE_URL}/guide|" \
            -e "s|interface_url: https://docs.mat3ra.com/interface|interface_url: ${BASE_URL}/interface|" \
            -e "s|reference_url: https://docs.mat3ra.com/reference|reference_url: ${BASE_URL}/reference|" \
            -e "s|resources_url: https://docs.mat3ra.com/resources|resources_url: ${BASE_URL}/resources|" \
            -e "s|developers_url: https://docs.mat3ra.com/developers|developers_url: ${BASE_URL}/developers|" \
            -e "s|cli_url: https://docs.mat3ra.com/command-line|cli_url: ${BASE_URL}/command-line|" \
            -e "s|data_url: https://docs.mat3ra.com/standards|data_url: ${BASE_URL}/standards|" \
            -e "s|guide_url: https://docs.mat3ra.com$|guide_url: ${BASE_URL}|" \
            -e "s|interface_url: https://docs.mat3ra.com$|interface_url: ${BASE_URL}|" \
            -e "s|reference_url: https://docs.mat3ra.com$|reference_url: ${BASE_URL}|" \
            -e "s|resources_url: https://docs.mat3ra.com$|resources_url: ${BASE_URL}|" \
            -e "s|developers_url: https://docs.mat3ra.com$|developers_url: ${BASE_URL}|" \
            -e "s|cli_url: https://docs.mat3ra.com$|cli_url: ${BASE_URL}|" \
            -e "s|data_url: https://docs.mat3ra.com$|data_url: ${BASE_URL}|" \
            "$src" > "$dst"
        echo "$dst"
    }
    LEGACY_CFG=$(make_preview_config mkdocs.yml)
    GUIDE_CFG=$(make_preview_config mkdocs-guide.yml)
    INTERFACE_CFG=$(make_preview_config mkdocs-interface.yml)
    CONCEPTS_CFG=$(make_preview_config mkdocs-concepts.yml)
    RESOURCES_CFG=$(make_preview_config mkdocs-resources.yml)
    DEVELOPERS_CFG=$(make_preview_config mkdocs-developers.yml)
    CLI_CFG=$(make_preview_config mkdocs-cli.yml)
    STANDARDS_CFG=$(make_preview_config mkdocs-standards.yml)
fi

# Legacy full site (root)
python -m mkdocs build -f "$LEGACY_CFG"

# Split sites into subfolders
python -m mkdocs build -f "$GUIDE_CFG"      -d site/guide
python -m mkdocs build -f "$INTERFACE_CFG"  -d site/interface
python -m mkdocs build -f "$CONCEPTS_CFG"   -d site/reference
python -m mkdocs build -f "$RESOURCES_CFG"  -d site/resources
python -m mkdocs build -f "$DEVELOPERS_CFG" -d site/developers
python -m mkdocs build -f "$CLI_CFG"        -d site/command-line
python -m mkdocs build -f "$STANDARDS_CFG"  -d site/standards

# Copy subsite homepages to root index.html, fixing relative paths
fix_and_copy_homepage() {
    local src="$1" dst="$2"
    [ -f "$src" ] && sed \
        -e 's|"base": ".."|"base": "."|' \
        -e 's|"\.\./assets/|"./assets/|g' \
        -e 's|"\.\./search/|"./search/|g' \
        -e 's|"\.\./extra/|"./extra/|g' \
        -e 's|"\.\./images/|"./images/|g' \
        -e 's|href="\.\./|href="./|g' \
        -e 's|src="\.\./|src="./|g' \
        "$src" > "$dst" || true
}
fix_and_copy_homepage site/guide/index-guide/index.html              site/guide/index.html
fix_and_copy_homepage site/interface/index-interface/index.html       site/interface/index.html
fix_and_copy_homepage site/reference/index-concepts/index.html       site/reference/index.html
fix_and_copy_homepage site/resources/index-resources/index.html      site/resources/index.html
fix_and_copy_homepage site/developers/index-developers/index.html    site/developers/index.html
fix_and_copy_homepage site/command-line/index-cli/index.html                  site/command-line/index.html
fix_and_copy_homepage site/standards/index-standards/index.html      site/standards/index.html
