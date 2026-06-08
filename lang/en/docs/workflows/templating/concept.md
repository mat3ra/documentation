# Templating Concept

**Templating** is a general concept [^1] for automating and generalizing the production of textual data based on a common source, referred to as the core **"Template"**. Template usually looks much like the final output, with placeholders instead of the actual data. The data, henceforth referred to as **Context**, is a set of **input parameters** which are passed to the template through the **Template Engine** in order to generate distinct outputs, each representing a custom variant of the original template.

## Origins in Web Development

Templating is commonly encountered in web publishing, where it lets web designers and developers work with web templates to automatically generate custom web pages. In this case, web templates support static content, providing the basic structure and appearance of the web page, on top of which more complex dynamic elements can then be added.

The basic process for a web templating system is illustrated in the picture below. Here, the content parameters of the web-page (originating from a database), and a web template, are combined together through the Template Engine to mass-produce web documents.

![Templating](../../images/workflows/templating.png "Templating")

## Use within the platform

We make use of [Jinja](jinja.md) templating syntax. During the [**design time**](concept.md#template-rendering) render we use **Swig** [^2], a JavaScript template engine supporting Jinja syntax. During the [**runtime**](concept.md#template-rendering) templates are rendered by python implementation of Jinja.

### Native Language Constructs

The templating syntax for the above two scenarios is almost equivalent. There are, however, some differences. Most importantly, Swig provides access to native JavaScript constructs, while Jinja2 enables access to native Python syntax (`list.append()` in Python, but `array.push()` in Javascript). Users should remember that pythonic constructs are only available during the Runtime render, and JavaScript - only during Design time. However, if accessing the native language features is avoided and solely relied on pure templating features, templates can be made fully equivalent.

### Usage Scenarios

In this respect, templates are applied to many different [materials](../../materials/overview.md) during the creation of [Jobs](../../jobs/overview.md), in conjunction with different input parameters (or template variables/context), specific for each material.

We allow for using templates specifically inside the input of [units](../components/units.md) comprised in a [subworkflow](../components/subworkflows.md). In this way, we can decouple material-specific information from workflow-specific. The latter lets us apply a workflow for multiple materials at the same time, without having to adjust it extensively.

The templates (input files) are rendered in two places, on [web interface]({{ interface_url }}/ui/overview/) when workflows (or jobs) are designed and on [computing clusters]({{ resources_url }}/infrastructure/clusters/overview/) when the job is executed, henceforth referred to as **Design-time Rendering** and **Runtime Rendering** respectively. The is necessary as some templates require data which is only available at runtime (e.g. `outdir` in Quantum Espresso PWScf input file)

## Links

[^1]: [Wikipedia Web template system, Website](https://en.wikipedia.org/wiki/Web_template_system)
