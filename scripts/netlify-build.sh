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
GUIDE_CFG="mkdocs-guide.yml"
CONCEPTS_CFG="mkdocs-concepts.yml"
DEV_CFG="mkdocs-dev.yml"

if [ "$CONTEXT" = "deploy-preview" ] || [ "$CONTEXT" = "branch-deploy" ]; then
    BASE_URL="${DEPLOY_PRIME_URL}"
    echo "=== Deploy preview detected: rewriting cross-site URLs to ${BASE_URL} ==="
    make_preview_config() {
        local src="$1"
        local dst=".preview-$(basename "$1")"
        sed \
            -e "s|guide_url: https://docs.mat3ra.com/guide|guide_url: ${BASE_URL}/guide|" \
            -e "s|reference_url: https://docs.mat3ra.com/reference|reference_url: ${BASE_URL}/reference|" \
            -e "s|dev_url: https://docs.mat3ra.com/dev|dev_url: ${BASE_URL}/dev|" \
            "$src" > "$dst"
        echo "$dst"
    }
    GUIDE_CFG=$(make_preview_config mkdocs-guide.yml)
    CONCEPTS_CFG=$(make_preview_config mkdocs-concepts.yml)
    DEV_CFG=$(make_preview_config mkdocs-dev.yml)
fi

# Legacy full site (root)
python -m mkdocs build

# Split sites into subfolders
python -m mkdocs build -f "$GUIDE_CFG"    -d site/guide
python -m mkdocs build -f "$CONCEPTS_CFG" -d site/reference
python -m mkdocs build -f "$DEV_CFG"      -d site/dev

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
fix_and_copy_homepage site/guide/index-guide/index.html         site/guide/index.html
fix_and_copy_homepage site/reference/index-concepts/index.html  site/reference/index.html
fix_and_copy_homepage site/dev/index-dev/index.html             site/dev/index.html
