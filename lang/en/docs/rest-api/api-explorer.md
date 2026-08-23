# API Explorer

The API Explorer is an interactive web-based tool for browsing, testing, and understanding the Mat3ra REST API. It is built on Swagger UI [^1] and provides a visual interface for every available endpoint.


## Accessing the Explorer

The API Explorer is available at [api-explorer.mat3ra.com](https://api-explorer.mat3ra.com/). It loads the current API specification automatically and presents all endpoints grouped by entity type.


## Authentication

Before making requests through the Explorer, the authentication parameters must be set. These are the same `X-ACCOUNT-ID` and `X-AUTH-TOKEN` headers described in the [authentication](authentication.md) page. Enter them in the corresponding fields at the top of the Explorer interface.


## Trying an Endpoint

The following steps demonstrate how to use the API Explorer to list materials:

First, open the [REST API Explorer](https://api-explorer.mat3ra.com/) page and set the `X-ACCOUNT-ID` and `X-AUTH-TOKEN` authentication parameters.

Then, navigate to the *Materials* endpoint and set up the [query](query-structure.md#query) (e.g. `{"formula": "Si"}`) and [projection](query-structure.md#projection) (e.g. `{"limit": 5}`) parameters.

Click **RESPONSE EXAMPLE** and **RESPONSE SCHEMA** on the right panel to see an example response and its structure (schema). Click **Try** to connect to the REST API and retrieve the results.

A list of materials filtered by the given query and projection parameters is returned.

<img data-gifffer="/images/rest-api/swagger-list-materials.gif"/>


## Features

The Explorer interface provides several features for each endpoint:

- **Request parameters** — view required and optional parameters with their types and descriptions
- **Response examples** — inspect the structure of a successful response before making a request
- **Response schema** — examine the full data model returned by each endpoint
- **Try it** — execute a live request against the API and view the response in real time


## API Versions

The following API versions are currently supported:

- [2018-10-01](https://platform.mat3ra.com/api/2018-10-01/swagger.json)


## Links

[^1]: [Swagger UI, GitHub](https://github.com/swagger-api/swagger-ui/tree/v2.2.10)

///FOOTNOTES GO HERE///
