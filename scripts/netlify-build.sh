#!/bin/bash
git submodule update --recursive --init
git lfs install
git lfs pull
# git LFS objects can alternatively be handled via environmental variables
# GIT_LFS_ENABLED=true and GIT_LFS_FETCH_INCLUDE
# https://answers.netlify.com/t/problem-checking-out-file-stored-in-git-lfs-on-github/103897/7

# pip packages are automatically installed by netlify
# if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

# Legacy full site (root)
python -m mkdocs build

# Split sites into subfolders
python -m mkdocs build -f mkdocs-guide.yml    -d site/guide
python -m mkdocs build -f mkdocs-concepts.yml -d site/reference
python -m mkdocs build -f mkdocs-dev.yml      -d site/dev

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
