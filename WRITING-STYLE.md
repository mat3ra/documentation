# Exabyte.io Documentation - Writing Style

## Formality

Some useful writing style rules are listed below:

- Language has to be simple, dry, and concise. Avoid use of superfluous, adorning or exaggerating adjectives, such as saying things like "the *complete* list of *all the many different* items". Just say "the list of items".

- Use third person when referring to reader/user. So, instead of saying "*you* can access", say it as "*the user* can access" or use the passive voice: "this functionality can be accessed".

- Allow for both genders when thinking about the reader, for example: "he/she is advised to do open the account page" or "his/her account balance should be consulted".

- Never start a sentence with short interjections like "To". Consider using more complex forms such as "In order to". Consider a similar approach with "By", "From" etc. 

- Give preference to present tense rather than future tense.

- It's better to say "click the button" than "click on the button".

- Introduce acronyms at first mention in every page, like: "Density Functional Theory (DFT) is used as a simulation tool....". Don't put acronyms in headers.

- For concepts that do not originate at Exabyte, put links to original source (or Wikipedia) instead of re-explaining them inside documentation.

## Words to Avoid

The following list of words should be avoided:

- Simply
- Clearly
- Obviously
- In fact
- Furthermore
- Moreover
- Complete
- In particular
- Really
- Distinct
- Various 
- Automatically
- Finally

## Multi-Site Link Conventions

The documentation is split into Guide, Reference, and Dev sub-sites.
Links within the same sub-site use relative paths. Links to a page in a
different sub-site use macro variables:

- `{{ guide_url }}` — Platform Guide (tutorials, UI, how-tos)
- `{{ reference_url }}` — Concepts & Reference (models, methods,
  properties)
- `{{ dev_url }}` — Developer Guide (REST API, infrastructure, storage)

Pages that contain raw Jinja2 code examples (e.g., `{{ input.NAT }}`)
must wrap those blocks in `{% raw %}…{% endraw %}` so the macros plugin
does not consume them. Do not set `render_macros: false` if the page
also contains cross-site macro links.

## Extra Styles and Sources

The default [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) theme is extended, with additional css and javascript inside [extra](extra) folder. Any new files shall go into the same folder and shall be added to the corresponding section of [mkdocs.yml](mkdocs.yml).

## Notes on Object-Oriented Design 

We embrace Object Oriented Design (OOD) principles when structuring the documentation. The rationale for adhering to the above OOP principles is mainly to avoid unnecessary repetitions of the same explanations in multiple different places, and thus to make the documentation easily expandable or modifiable in the future when new features will be added/changed.

## OOD Principles

- **Encapsulation**: each topic should be encapsulated in its own section, meaning that it should be **isolated** from the rest of the documentation content, with the latter linking to a single original source. See the folder structure and the explanation of [pseudopotential](docs/methods-directory/pseudopotential/overview.md) method, for example.

- **Abstraction**: general concepts shared by multiple specific implementations shall be explained separately from the implementations themselves. See [method](lang/en/docs/methods/overview.md) and [pseudopotential](lang/en/docs/methods-directory/pseudopotential/overview.md) method, explanation, for example.

- **Inheritance**: specific pages should inherit most of their contents from the general pages explained at the top level of a section. See example mentioned in the previous point.

> Example:
> 
> "All humans have two hands and two legs, which is a general and abstract property. However only a small fraction of these humans have blond hair, which is a special property. When you explain blond hair in its own specialized and encapsulated documentation page, you should not need to repeat that blond people have two legs and two hands, since such abstract concepts will be inherited from the top level page explaining the basic general physiology common to ALL humans, including blonds"

## Typical Structure of Documentation Sections

Some pages/sections appear recurrently in most documentation sections. Below is a list of the most common ones, with a brief explanation:

- **overview**: page with introduction to the contents of the present section (containing one *clickable/linked sub-header* for each main topic discussed in section). Should be present both at top level of each section, and within each of its main sub-sections.

- **ui**: section describing the user interface implementation of concepts (to should be explained separately).

- **data**: section containing JSON structured representations for the entities treated in the present section.

- **actions**: section describing the actions (such as open, edit, delete etc) related to the concepts under discussion.

## Directory Pattern

When there are multiple implementations of a particular concept, we apply a "Directory Pattern", where the concept is explained separately, and then the multiple implementations of the concept are organized into a directory. See [method](lang/en/docs/methods/overview.md) and [pseudopotential](lang/en/docs/methods-directory/pseudopotential/overview.md) method, explanation, for example.
