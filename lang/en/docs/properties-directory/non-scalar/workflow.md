# Workflow

<span class="btn badge b-success border-50">Non-Scalar</span>

Some jobs, such as in [machine learning](../../models-directory/machine-learning/overview.md), can result in a new
workflow being generated and placed in the user's account. 

## Creation during ML Jobs

If any unit in the workflow has the `workflow:pyml_predict` property,
[Express will be called](https://github.com/mat3ra/express/blob/dev/express/properties/workflow.py) to construct
the new predict workflow. The following process is performed to convert a workflow from "Train" to "Predict" mode:

- The `IS_WORKFLOW_RUNNING_TO_PREDICT` flag is set to `True`
- Any units which contain a `workflow:pyml_predict` property have this property removed (to prevent new workflows 
  from being generated when the predict job is run)
- IO units are configured to download any python objects saved by the user with the context manager in settings.py.
  These files are saved inside of the `.job_context` folder.


## Example

In the below example, a user has run a machine learning training workflow,
which has generated a workflow named `workflow:pyml_predict`.

![Workflow](../../images/properties-directory/workflow-property.png "Workflow generated via ML")


## Schema

The JSON schema and an example implementation can be found [here]({{ data_url }}/properties/data/list/#workflow)
