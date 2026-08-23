# Documentation Review Guide

This file defines a repeatable review process for evaluating and improving
the Mat3ra documentation. It is designed for AI coding agents but can also
be used by human reviewers.

Read [`WRITING-STYLE.md`](WRITING-STYLE.md) and [`AGENTS.md`](AGENTS.md)
first — they are the canonical references for prose style and agent
guidance respectively. This file builds on them.

---

## Review Panel

The review simulates a panel of three personas. Each brings a different
lens to the documentation:

| ID | Persona | Focus |
|----|---------|-------|
| R1 | Experienced computational materials scientist (5–10 yr) | Technical accuracy, depth, correctness of methods and parameters |
| R2 | First-year postdoc in comp chem / AI for materials | Cross-linking, discoverability, ML workflow clarity |
| R3 | Last-year PhD student in comp. mat. sci. | Clarity for newcomers, step-by-step completeness, visual aids |

When scoring, consider how each persona would rate the page independently,
then average.

---

## Evaluation Criteria

Score each page on a 0–10 scale across five criteria:

### C1: Structural Consistency

| Score | Description |
|-------|-------------|
| 9–10 | Numbered sections (`## 1.`, `### 1.1.`), imperative subheadings, no list directly under heading, proper H1/H2/H3 hierarchy |
| 7–8 | Numbered sections but inconsistent subheading style, or one heading-level violation |
| 5–6 | Unnumbered sections, gerund subheadings, lists under headings |
| 0–4 | No structure, flat document, missing H1 |

### C2: Voice & Style

| Score | Description |
|-------|-------------|
| 9–10 | Third-person/passive throughout, no forbidden words, no "you/your/we/our", acronyms introduced on first use |
| 7–8 | 1–2 isolated voice violations, otherwise clean |
| 5–6 | Frequent "we"/"you" usage, some forbidden words |
| 0–4 | Pervasive second-person, marketing tone |

**Forbidden words** (from `WRITING-STYLE.md`): *Simply, Clearly,
Obviously, In fact, Furthermore, Moreover, Complete, In particular,
Really, Distinct, Various, Automatically, Finally*.

### C3: Technical Depth

| Score | Description |
|-------|-------------|
| 9–10 | Method explained with references, key parameters documented, expected results stated, comparison to experiment/literature where applicable |
| 7–8 | Method referenced but not explained, parameters listed without rationale |
| 5–6 | Procedural steps only, no "why" |
| 0–4 | Incomplete procedure, missing steps |

### C4: Navigability & Cross-Linking

| Score | Description |
|-------|-------------|
| 9–10 | All related tutorials cross-linked, prerequisite tutorials referenced, same-site relative links, cross-site macro links |
| 7–8 | Most links present, one or two missing cross-references |
| 5–6 | Minimal linking, isolated page |
| 0–4 | Broken links or no links at all |

### C5: Media & Visuals

| Score | Description |
|-------|-------------|
| 9–10 | All images have alt text + title, `.webp` format, video embeds present, screenshots current |
| 7–8 | Images present with alt text but PNG format, or one missing caption |
| 5–6 | Some images without alt/title, outdated screenshots |
| 0–4 | No images or broken image links |

---

## How to Run a Review

### Quick Prompt (paste into chat)

```
Review the documentation under `lang/en/docs/tutorials/` following the
process defined in REVIEW.md. Score each page on the 5 criteria (C1–C5),
produce a scorecard table, then refactor the lowest-scoring pages to bring
the average above 9/10. Work in rounds of 5–8 files, updating the
scorecard after each round.
```

### Full Prompt (for thorough multi-round review)

```
You are a review panel consisting of:

(1) An experienced computational materials scientist with 5–10 years of
    experience
(2) A first-year postdoc in comp chem / AI for materials
(3) A last-year PhD student in comp. mat. sci.

Read REVIEW.md, WRITING-STYLE.md, and AGENTS.md. Then:

1. Score every tutorial page under `lang/en/docs/tutorials/` on the 5
   criteria defined in REVIEW.md (C1–C5, 0–10 scale).
2. Produce a scorecard table grouped by section.
3. Identify the lowest-scoring pages and refactor them in rounds of 5–8
   files per round.
4. After each round, re-score the refactored pages and update the
   scorecard.
5. Continue until the mean score across all pages is ≥ 9/10.
6. Produce a final scorecard and a walkthrough of all changes made.
```

### Scoping a Partial Review

To review a specific section only:

```
Review only the files under `lang/en/docs/tutorials/dft/vibrational/`
following REVIEW.md. Score, refactor, and re-score.
```

---

## Style Checklist (Quick Reference)

This distills the most common issues found during reviews. Check every
page against this list:

- [ ] One H1 (`#`) on line 1; sub-headers use sentence case
- [ ] Sections numbered: `## 1.`, `### 1.1.`
- [ ] Subheadings are imperative ("Import the workflow", not "Importing
      the workflow")
- [ ] No list starts directly under a heading — open with prose first
- [ ] Lists are flat (single level); images/code blocks are flush-left
- [ ] Third person / passive voice throughout; no "you", "your", "we",
      "our"
- [ ] None of the forbidden words from `WRITING-STYLE.md`
- [ ] No acronyms in headings; acronyms introduced on first use in body
- [ ] Same-site links use relative paths
- [ ] Cross-site links use `{{ guide_url }}`, `{{ reference_url }}`, or
      `{{ dev_url }}` macros
- [ ] All images have alt text and title: `![alt](path "title")`
- [ ] Prefer `.webp` images; each file < 1 MB
- [ ] Video embeds use the standard `<div class="video-wrapper">` pattern
- [ ] Version notes include "and later" (e.g., "5.2.1, 5.4.0, 6.0.0,
      6.3, and later")
- [ ] `mkdocs.yml` updated if pages were added, renamed, or moved

---

## Baseline Scores (June 2025)

These scores reflect the state after 12 rounds of review. Use them as a
starting point — re-score before making changes to account for any
subsequent edits.

| Section | Pages | Mean Score | Status |
|---------|-------|------------|--------|
| DFT Electronic | 16 | 9.2 | ✅ Refactored |
| DFT Vibrational | 4 | 9.0 | ✅ Refactored |
| DFT Thermodynamic | 1 | 9.2 | ✅ Refactored |
| DFT Chemical | 2 | 9.2 | ✅ Refactored |
| DFT Optical | 1 | 9.2 | ✅ Refactored |
| DFT Addons | 2 | 9.2 | ✅ Refactored |
| Python ML | 5 | 9.1 | ✅ Refactored |
| ML (legacy + DeePMD) | 4 | 9.0 | ✅ Refactored |
| Reference / Overview | 4 | 8.4 | ✅ Refactored |
| **Tutorials overall** | **39** | **9.1** | |
| Templating | 2 | ~6.0 | ⬜ Not yet reviewed |
| General Functionality | 2 | ~5.5 | ⬜ Not yet reviewed |
| Materials | ~12 | ~6.5 | ⬜ Not yet reviewed |
| Materials (specific) | ~20 | ~6.0 | ⬜ Not yet reviewed |

---

## Common Refactoring Patterns

These patterns were applied repeatedly during the 12-round review.
Future agents should follow the same approach:

### Voice Fixes

```diff
-We will now calculate the band structure.
+The band structure is calculated as follows.

-In this tutorial, we demonstrate how to...
+This tutorial demonstrates how to...

-You should click the button.
+Click the button. / The button should be clicked.

-our platform
+the platform
```

### Section Numbering

```diff
-## Create Job
+## 1. Create the job

-## Choose Workflow
+## 2. Select the workflow

-### Examine Input Files
+### 2.1. Examine the input files
```

### Heading Style

```diff
-### 1.1. Importing a workflow
+### 1.1. Import a workflow

-### 4.2. Example Results
+### 4.2. Example results
```

### No List Under Heading

```diff
 ### 1.1. Import a bank workflow

-  - Navigate to the Workflows Bank page.
-  - Search for the workflow.
+First, navigate to the Workflows Bank page.
+Then, search for the workflow.
```

### Version Notes

```diff
-    The present tutorial is written for Quantum ESPRESSO at versions
-    5.2.1, 5.4.0, 6.0.0 or 6.3.
+    This tutorial applies to Quantum ESPRESSO versions 5.2.1, 5.4.0,
+    6.0.0, 6.3, and later.
```

### Verbose Workflow Details → Collapsible

When a tutorial has extensive workflow/parameter documentation that
interrupts the procedural flow, move it into a collapsible block:

```markdown
<details markdown="1">
  <summary>Expand to view input parameter details</summary>

  ... detailed parameter documentation ...

</details>
```

---

## Extending This Guide

When adding new evaluation criteria or refactoring patterns:

1. Add the criterion to the "Evaluation Criteria" section with score
   descriptions.
2. Add a corresponding checklist item to "Style Checklist".
3. If a new refactoring pattern emerges, add a diff example to "Common
   Refactoring Patterns".
4. Update the baseline scores table after each review cycle.
