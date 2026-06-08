# Endpoints

## Definition

An Endpoint is one end of a communication channel, the API end of it. It has a unique URL and a set of parameters associated with it. Sending a request with a specific HTTP [^1] method to an Endpoint triggers a certain function.

!!! example
    Contacting materials endpoint with a PUT HTTP method and the corresponding data about a material will lead to the creation of the corresponding [Material]({{ reference_url }}/materials/overview/) inside the database and return the result.

## List of Endpoints

Below is the list of currently supported endpoints with links to the detailed documentation in the [API Explorer](api-explorer.md):

- [Material](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/Material/get_materials)
- [Workflow](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/Workflow/get_workflows)
- [Job](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/Job/get_jobs)
- [Project](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/Project/get_projects)
- [Bank Material](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/BankMaterial/get_bank_materials)
- [Bank Workflow](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/BankWorkflow/get_bank_workflows)
- [Property](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/Property/get_refined_properties) (RefinedProperty)
- [RawProperty](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/RawProperty/get_raw_properties)
- [Charge](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/Charge/get_charges)
- [Login](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/API/post_login)
- [Logout](https://api-explorer.mat3ra.com/?url=https://platform.mat3ra.com/api/2018-10-01/swagger.json/#!/API/get_logout)


## Links

[^1]: [Wikipedia Hypertext Transfer Protocol (HTTP), Website](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)

///FOOTNOTES GO HERE///
