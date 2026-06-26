# Mat3ra Documentation

[Mat3ra](https://www.mat3ra.com) is a computational platform for the development of new materials and chemicals. The present documentation explains how the [platform](https://platform.mat3ra.com/) works in details. Currently deployed version of the documentation is available at [this link](http://docs.mat3ra.com).

## Setup

For a quick installation:

1. Install dependencies: python 3 (tested on Python `3.10`-`3.13`), `pip`, `curl`, [`virtualenv`](https://virtualenv.pypa.io/en/latest/installation/), git, [git-lfs](https://git-lfs.github.com/).

2. Clone this repository:

    ```bash
    git clone https://github.com/mat3ra/documentation.git
    ```

3. Setup virtual environment

    ```bash
    cd documentation
    virtualenv .venv
    source .venv/bin/activate
    pip install --no-deps -r requirements.txt
    ```

4. Init git submodules:

    ```bash
    git submodule update --recursive --init
    ```

5. (Optional) Set the documentation directory, if plan to use other languages than English:

    ```bash
    export DOCS_dir="lang/ja/docs"
    ```

6. Start mkdocs server (after sourcing virtual environment):

    ```bash
    mkdocs serve
    ```

This starts the legacy full site at `http://localhost:8000`. For the
multi-site setup (Guide / Concepts / Dev), see the next section.

### Multi-Site Build (Guide / Concepts / Dev)

The documentation is split into three focused sites, each with its own MkDocs
configuration. The original `mkdocs.yml` remains available for the full
monolithic build.

| Config file | Site | URL | Dev port |
|-------------|------|-----|----------|
| `mkdocs.yml` | Full (legacy) | `docs.mat3ra.com` | 8000 |
| `mkdocs-guide.yml` | Platform Guide | `docs.mat3ra.com/guide/` | 8001 |
| `mkdocs-concepts.yml` | Concepts & Reference | `docs.mat3ra.com/reference/` | 8002 |
| `mkdocs-dev.yml` | Developer Guide | `docs.mat3ra.com/dev/` | 8003 |

#### Serve a single site (quick editing)

```bash
source .venv/bin/activate
mkdocs serve -f mkdocs-guide.yml       # localhost:8001
mkdocs serve -f mkdocs-concepts.yml    # localhost:8002
mkdocs serve -f mkdocs-dev.yml         # localhost:8003
```

Pages within the site work normally with live reload.
Cross-site links navigate to `docs.mat3ra.com` (production).

#### Build & serve all sites locally (full testing)

```bash
./scripts/serve-all.sh
```

This builds the legacy site plus all three subsites into `site/` and starts a
local server on `http://localhost:8000`:

- `http://localhost:8000/`           — legacy full site
- `http://localhost:8000/guide/`     — Platform Guide
- `http://localhost:8000/reference/` — Concepts & Reference
- `http://localhost:8000/dev/`       — Developer Guide

Cross-site links in Markdown use `{{ guide_url }}`, `{{ reference_url }}`, and
`{{ dev_url }}` variables (resolved by the macros plugin at build time).
The `serve-all.sh` script automatically overrides these to point to
`http://localhost:8000/…`, so cross-site navigation works locally without any
extra setup.

#### Build only (CI / deploy)

```bash
mkdocs build -f mkdocs.yml                                           # legacy at /
mkdocs build -f mkdocs-guide.yml    -d site/guide                    # /guide/
mkdocs build -f mkdocs-concepts.yml -d site/reference                # /reference/
mkdocs build -f mkdocs-dev.yml      -d site/dev                      # /dev/
```

#### Validate internal links

After building, run the post-build link checker to catch broken internal
links across all four sites:

```bash
.venv/bin/python scripts/links/check-links.py
```

This scans every `<a href>` in the built `site/` directory and verifies
that the target file exists. Exit code 1 means broken links were found.
Additional helper scripts live in `scripts/links/`.

### Cross-Site Linking Convention

Because each sub-site only contains a subset of pages, links between
sites cannot use relative paths — the target file doesn't exist in the
same build. The convention is:

| Link target is…               | Use this form                                          |
| ----------------------------- | ------------------------------------------------------ |
| In the **same** sub-site      | Relative path: `[text](../path/to/page.md)`            |
| In a **different** sub-site   | Macro link: `[text]({{ reference_url }}/path/to/page/)` |

The macro variables (`guide_url`, `reference_url`, `dev_url`) are defined
in the `extra:` section of each config file and resolved at build time by
the `mkdocs-macros-plugin`.

#### Which page belongs to which site?

Each sub-site config has an `exclude_docs:` block listing directories and
files that belong to other sites. If a page is excluded from a sub-site,
any link **to** it from within that sub-site must use the appropriate
macro instead of a relative path.

| Top-level directory          | Site                         |
| ---------------------------- | ---------------------------- |
| `tutorials/`, `ui/`, `jobs-designer/`, `workflow-designer/`, `software-directory/`, `cli/`, `jobs-cli/`, `getting-started/`, `pricing/`, `jupyterlite/`, `remote-connection/`, `materials-designer/` | **Guide** (`guide_url`) |
| `models/`, `models-directory/`, `methods/`, `methods-directory/`, `properties-directory/`, `software/`, `benchmarks/`, `data/`, `data-structured/`, `security/`, `site-policy/` | **Reference** (`reference_url`) |
| `infrastructure/`, `data-on-disk/`, `rest-api/`  | **Dev** (`dev_url`) |
| `accounts/`, `entities-general/`, `jobs/`, `materials/`, `properties/`, `workflows/`, `collaboration/`, `data-in-objectstorage/` | **Shared** (split by page — check `exclude_docs`) |

For shared directories, individual pages are assigned to specific sites
via the `exclude_docs` lists. For example, `jobs/overview.md` is in
Reference, while `jobs/actions/` is in Guide.

#### Pages with raw Jinja syntax

Some pages (e.g., templating tutorials) contain raw Jinja2 code examples
like `{{ input.RESTART_MODE }}` that would be consumed by the macros
plugin. These pages use `{% raw %}…{% endraw %}` blocks around code
examples to prevent the macros plugin from interpreting them:

````markdown
---
render_macros: true
---
# Templating Example

The [Jinja engine]({{ reference_url }}/workflows/templating/jinja/) renders variables.

{% raw %}
```jinja
{{ input.NAT }}
```
{% endraw %}
````

The key rule: **never** set `render_macros: false` on a page that also
contains cross-site macro links (`{{ guide_url }}`, etc.), because those
macros will be left as literal text in the HTML output, producing broken
links. Instead, set `render_macros: true` (or omit the front-matter key
entirely) and wrap only the raw Jinja code blocks in `{% raw %}`.


## Development

[MkDocs](http://www.mkdocs.org/#getting-started) is used to convert Markdown files (*.md) into static html and [is configured](mkdocs.yml) to use [Mkdocs-material](https://squidfunk.github.io/mkdocs-material/) theme.

### Tutorial Video Formats

Generally, text-based tutorials should have a video tutorial published alongside them. A few notes about the video
tutorials:
- Resolution should be kept such that users can read the text that's on the screen without needing to zoom in. A good
  resolution to record in is 720p (1152 x 720 on a macbook, or 1280 x 720 elsewhere).

### Formatting Styles

#### Headers

Write the main header (title) of the page as the first line, using top-level markdown notation (`#`). After adopting ["Material"](https://squidfunk.github.io/mkdocs-material/) mkdocs theme, the Table of contents (on the right, containing the current page structure) is not operational when more than one top-level header is present (h1). Therefore, we shall limit each and every page to only use **one** top-level header, and all the rest should be entered as sub-headers.

All other sub-headers contained throughout the remainder of the page should then be entered as second, third or even fourth degree headers, like in the following example:

```text
# Main Header (only one allowed, to be put in first line of page)
## Second-degree Sub-header
### Third-degree Sub-Header
#### Fourth-degree Sub-header
```

For long doc pages, we may enumerate sections and sub-sections (helpful to
determine scroll/reading position).

```text
# 1. Section One
## 1.1 Subsection One
## 1.2 Subsection Two
# 2. Section Two
```

#### New Lines

Leave a newline after the heading elements:

```text
## Job

You can create a new job by clicking the appropriate icon.
```

#### Empty Spaces

Leave ONLY one empty line at the bottom of the page, and between paragraphs. Minimize the presence of unnecessary empty spaces within the main text of the page.

Leave more than one empty line (2-3) when "coming back" to higher-level header from nested level, as below:

```text
## Job

...

### Job Parameters

...

#### Job Sub-parameters

...


## Workflow

...
```

#### Admonition Styles

There are multiple [admonition](https://squidfunk.github.io/mkdocs-material/reference/admonitions/) classes available in MKDocs: tip (green), warning (orange), error (red), note (blue), and many others. To insert them in documentation pages, enter them with the following style:

```text
!!!tip "Unused credits"
    All unused credits automatically roll over into the next validity period.
```

is rendered into:

!!!tip "Unused credits"
    All unused credits automatically roll over into the next validity period.

#### Expandable Sections

Expandable section can be added using:

```text
<details markdown="1">
  <summary>**INCAR**</summary>
    ```
    ALGO = Normal
    EDIFF = 0.0001
    ...
    ```
</details>
```

is rendered into:

<details markdown="1">
  <summary>**INCAR**</summary>
    ```
    ALGO = Normal<br>
    EDIFF = 0.0001
    ...
    ```
</details>

Please note the `markdown=1` tag, without it the content of the `<details>` tag will not be processed appropriately. Also, the two spaces before `<summary>` seem mandatory for the same purpose.

#### ZMDI Icons

Use [zmdi](http://zavoloklom.github.io/material-design-iconic-font/cheatsheet.html) icons instead of saying "click" the button with 3 stripes:

```text
click the <i class="zmdi zmdi-check zmdi-hc-border"></i> icon
```

will be rendered as: "click the <i class="zmdi zmdi-check zmdi-hc-border"></i> icon".

We use the same ZMDI icon set for the main application. To find the correct ZMDI tag for an icon present on the Mat3ra user interface, right click on it within your web browser and click on "Inspect Element". The ZMDI tag should be mentioned within the resulting HTML code describing the user interface.

### Links

#### External Links

Including an external link is best done via a dedicated "Links" footnote section at the bottom of the page, through the `[^1]`, `[^2]`, `[^3]` etc... linking notation (this feature is implemented via the Footnotes [pymdwown extension package](https://squidfunk.github.io/mkdocs-material/extensions/footnotes)). For example (note the different style of citation for Websites, PDF documents, Wikipedia articles etc....):

```text
Apple is the main competitor to Microsoft [^1].

Mac OS [^2] is the main Operating System developed by Apple.

Mac OS can run VASP, a type of ab-initio simulation code [^3].

Full instructions on how to use VASP can be found in Ref. [^4].

## Links

[^1]: [Microsoft, Official Website](www.microsoft.com)
[^2]: [Mac OS, Official Website](www.apple.com/mac-os.html)
[^3]: [Wikipedia Ab-initio, Website](www.wikipedia.org/ab-initio-simulations.html)
[^4]: [VASP manual, Document](www.vasp.com/user-manual.pdf)

///FOOTNOTES GO HERE///
```

By default, footnotes are included at the bottom of the page. `///FOOTNOTES GO HERE///` statement is necessary to include them elsewhere.

#### Links to Other Documentation Pages

Including a local link to another page in the documentation, or a specific sub-header section within that page, is done with the following notations respectively.

```text
We explain service levels [in this page](../../pricing/service-levels.md)
```

```text
The particular information can be found [here](../../pricing/service-levels.md#pricing)
```

Use **ONLY RELATIVE** paths starting from the current page, not the absolute ones.

### Images and Animations

Images (.png, .webp, .gif) are stored inside [images](images) directory and are automatically hosted on Git LFS.
This is an acceptable way to contribute images, as long as the size is kept small (below 1Mb each) in order to avoid exceeding Github LFS quota.

> Note: Do NOT put videos inside this directory! Upload the video into your preferred online storage system such as Google Drive, DropBox, or YouTube, and share its link with us to review and put it up online.

Put images in separate folders within the main "images" directory, one for each top level section of the documentation.
Also in this case it is essential to use **RELATIVE** and not absolute paths to the image, starting from the current page.

A few conventions to use when naming images:

1. Try to use hyphen-case for naming the images. for example, `this-is-a-good-image-name.png`; this makes it easy for a
search engine to understand what the image is, and keeps the words neatly separated.

2. Avoid "keyword-stuffing," which search engines penalize. For example, in an image of copper nanoparticles, a
good image title might be "icosahedral-copper-nanoparticle-blue-background." A "keyword-stuffed" version of this
might be "copper-cu-nanoparticle-np-icosahedron-chemistry-nanomaterials-chemical-engineering-catalysis.png." A good rule of
thumb for whether an image title is keyword-stuffed or not is to ask: "Is this a natural way of describing the
image that would actually be used in a spoken conversation?"

#### Preferred Image Format `.webp`

The .webp format is preferred due to its size-effectiveness on the web.
To convert images to .webp format, make sure you have the `webp` package installed on your system. On MacOS, it can be done using Homebrew:

```bash
brew install webp
```

Then convert .png images to .webp using the following command in the target folder:
```bash
for file in $( ls *.png); do cwebp "${file}" -o "${file%*.png}.webp"; done
```

For more details about webp, please refer to https://developers.google.com/speed/webp

#### Including Images

Including an image/screenshot is done as follows, in MKDocs notation (don't use HTML tags).

```markdown
![Alt-Text](../path/to/the/image.png "Optional Title")
```

For example:

```markdown
![Simulation Diagram](../../images/simulation-job-wokflow-unit-explained.png "Simulation Diagram")
```

Alt-text is a [short description](https://en.wikipedia.org/wiki/Alt_attribute)
of the image being used. This is generally intended to provide an accessible description of the image for those who are
using screen readers. A few guidelines for the alt-text:

- Try to keep the image descriptions under 100 characters, since some screen readers will limit the number of characters
  it uses when describing an image to someone.
- Don't begin with redundant phrases such as "This is an image of...", "This picture shows...", etc. Just describe what's in
the image. For example, instead of "This picture shows a plate of spam and eggs," instead write "Plate of spam and eggs"

Note that alt-text generally used as part of search indexing in addition to the image title, so try to think about keywords for the image and the page,
and weave them (organically) into the alt-text.

The Optional Title (quotes after the path to the image) is the mouseover text that is generated. Generally, it should be
simple and human-readable.


#### Including GIFs

GIFs should be stored in the same image folders as normal images (see above) with a suggested frame rate of 15 (fps). Including a GIF image is done as follows.

```text
<img data-gifffer="/images/AddCredit.gif" />
```

In this case, absolute paths to the GIF need to be used, since we insert GIFs directly with HTML and relative paths don't work with HTML commands.

We use a third-party plugin, embedded into the source of this repository ("giffer") in order to make gif images clickable like videos.

#### Embedding Youtube Videos

Youtube videos can be embedded within documentation page through the following block of commands, linking to the video's identifier present in its URL:

```text
<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/MBpd-yKUCM4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```

#### Clickable Image Maps

Including a clickable image map is done as follows. Note that absolute paths to the image are required in this case, since we have to use HTML commands which don't work with relative paths.


```text
<img src="/images/workflow-designer-initial.png" usemap="#mapname">

<map name="mapname">
    <area shape="rect" coords="0,91,190,512" href="/workflow-designer/sidebar-items/">
    <area shape="rect" coords="190,91,754,512" href="/workflow-designer/source-editor/">
    <area shape="rect" coords="0,28,754,91" href="/workflow-designer/header-menu-actions">
</map>

<!--
    coords="x1,y1,x2,y2"
    x1=top left X coordinate
    y1=top left Y coordinate
    x2=bottom right X coordinate
    y2=bottom right Y coordinate
-->
```

### Code Blocks

#### JSON Schemas and Examples

Including resolved JSON schemas and associated examples should be done within dedicated `data.md` pages for each concept being explained.

The [markdown_include](https://github.com/mat3ra/markdown-include) package is used to include JSON content into markdown documents, by putting direct links to pages inside the [ESSE repository](https://github.com/mat3ra/exabyte-esse) instead of copying their contents in the main documentation.

```text
    === "Schema"

        ```json
        --8<-- "data/esse/schema/material.json"
        ```

    === "Example"

        ```json
        --8<-- "data/esse/example/material.json"
        ```
```

#### Code Snippets

Use the following conventions: "object" to quote object or concept, or `button` (between ` ticks as opposed to " quotes) to cite user interface icons or command-line statements in-line.

Extended code blocks should be enclosed between pairs of triple ticks with name of interpreter for the language being shown, like so:

    ```bash
    exec something
    VARIABLE = "Example"
    print "Hello World"
    ```

#### Latex Math Equations

Math equations written in Latex can be inserted within documentation pages (after installing requirements - see instructions at the top of this page) both in-line and as separate blocks, using the dollar notation as shown in the following example:

```text
We define the Average Pressure $p_{avg}$ of a Material according to the following conventional formula.

$$
p_{avg}=-\frac{1}{3} \mathrm{Tr} \hspace{1pt} {\boldsymbol{\sigma}}
$$
```

## Contribution

This repository is an [open-source](LICENSE.md) work-in-progress and we welcome contributions. We suggest forking this repository and introducing the adjustments there, the changes in the fork can further be considered for merging into this repository as explained in [GitHub Standard Fork and Pull Request Workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962).
