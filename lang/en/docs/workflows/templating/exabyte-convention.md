---
render_macros: true
---

# Exabyte Templating Convention

Following the [general introduction](concept.md) to the templating concepts and [engines](jinja.md), we now review the specific aspects concerning its implementation in the context of our platform.

## Contexts in our Platform

As explained [in this section](concept.md#template-rendering), templates are rendered on web interface and computing clusters separately. For that reason there are two different contexts passed to the templates on our platform as described below.

### Design-time Context

The context available to templates on web interface, containing materials, workflow's important settings, etc. An example context is provided in the [templating examples](examples.md).

### Runtime-time Context

The context passed to the templates at runtime. This context provides system-level parameters such as `JOB_WORK_DIR` variable which defines the main [Working Directory]({{ guide_url }}/jobs-cli/batch-scripts/directories/) for the [Job](../../jobs/overview.md) under consideration. This is a system-level [Environment Variable]({{ guide_url }}/jobs-cli/batch-scripts/directives/#environment-variables) that will be resolved only during the the runtime.

### Raw Syntax

The "Raw" filter syntax is used to prevent the Web Interface from rendering variables during the **Design-time Rendering**, given that such variables are only available during the ensuing **Runtime Rendering**. Hence, for example, the above-mentioned `JOB_WORK_DIR` variable would need to be entered as follows in a [Quantum ESPRESSO]({{ guide_url }}/software-directory/modeling/quantum-espresso/overview/) input file template, containing the line which defines the pseudopotential directory inside the [Working Directory]({{ guide_url }}/jobs-cli/batch-scripts/directories/).

```jinja
pseudo_dir = {% raw %}'{{ JOB_WORK_DIR }}/pseudo'{% endraw %}
```

In this way, the job working directory will only be assigned at runtime, based on the [account](../../accounts/overview.md) and job/workflow information provided automatically.

## Passing Standard Output

It is often convenient to pass the output of one [unit](../components/units.md) to another. This can currently be accomplished for the case of standard output at the [subworkflow](../components/subworkflows.md) level, through referencing units by name.

For example, let's assume that a [workflow](../overview.md) contains a subworkflow with a single shell script unit named "grep-nbands", which has the following input (it is assumed that it returns a number as part of its standard output).

```bash
grep "NBANDS" ./OUTCAR | awk '{print $3}'
```

Then the units inside any of the ensuing subworkflows can reference the result of the above unit at execution stage, by using a special `stdout` variable inside their input templates as follows.

```jinja
NBANDS = {% raw %} {{grep-nbands.stdout}} {% endraw %}
```

Note the usage of the aforementioned "Raw" filter, in order to make sure that no Design-time rendering is performed in this case.
