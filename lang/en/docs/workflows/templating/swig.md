---
render_macros: true
---

# Swig

As mentioned in [the concept explanation](concept.md) we make use of **Swig** to render the templates on the [Web Interface]({{ guide_url }}/ui/overview/). We introduce in this page the content specific to Swig. The reader is also referred to Swig official documentation for further reading [^1].

## Javascript Native Prototypes

All Javascript-related prototypes such as *Array* and *Object* [^2] are supported by Swig, as long as the function does not require a callback (function) as one of its arguments. For example `Array.prototype.find()` is not supported by Swig as it needs a callback, however it can be implemented by pure templating features as below.

{% raw %}
```jinja
{% set elements = [
  {"id": 0, "value": "Si"},
  {"id": 1, "value": "Ge"}
] %}
{% set element = "" %}
{% set element_found = false %}
{% for element_ in elements %}
  {% if not element_found and element_["id"] == 1 %}
    {% set element = element_ %}
    {% set element_found = true %}
  {% endif %}
{% endfor %}
element = {{ element["value"] }}
```
{% endraw %}

## Specific Statements

### Spaceless

`{% raw %}{% spaceless %}{% endraw %}` statement ensures that the text is rendered with no extra white spaces or empty lines added to it, and has to be terminated by `{% raw %}{% endspaceless %}{% endraw %}`.

## Links

[^1]: [Swig, Official Documentation](http://node-swig.github.io/swig-templates/docs/)

[^2]: [JavaScript, Official Documentation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
