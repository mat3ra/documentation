# Structured Representation of Jobs

In order to organize and store the information about Jobs we employ [Exabyte Data Convention]({{ reference_url }}/data-structured/overview/), as explained in more detail [elsewhere](../entities-general/data.md) in this documentation.

## Example representation

Below is an example JSON structured representation of a Job. It contains a single [Workflow](../workflows/overview.md) and one [Material](../materials/overview.md).

```json
{
    "name" : "Test Job",
    "version" : "0.2.0",
    "_material" : {
        "_id" : "FJHNZCixeNfopuLrA",
        "exabyteId" : "e3nJ9g7tLaARSA25g"
    },
    "workflow" : {
        ...
    },
    "compute" : {
        ...
    },
    "_project" : {
        "_id" : "ypijc9N27BixEpKfT",
    },
    "status" : "finished",
    "createdAt" : "2017-10-17T18:20:53.975Z",
    "updatedAt" : "2017-10-17T18:22:31.389Z"
}
```

## Explanation of Keywords

### Top-level Keywords

| Keyword    |   Description      |  
| :-------- |:----------- |
| _material |  Link to the identifiers of [material(s)](../materials/data.md) used in this job   | 
| workflow |  Content of the [Workflow](../workflows/data/workflows.md) employed in this job | 
| compute | Computational parameters as explained in [this page]({{ dev_url }}/infrastructure/compute/data/). |
| _project  | Link to the identifier of the [project](projects.md) containing the job  |
| status |   Indication of the current [status](status.md) of the job |  
