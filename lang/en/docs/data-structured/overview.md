# Structured Data

In this section, we provide an introduction to the practices we employ to organize data to make it **structured** and ready to be stored in the database.

!!! info "What is Structured Data?"
    *Structured* data is data that has been organized into a formatted repository, typically a *database*, so that its elements can be made addressable for more effective processing and analysis. A data structure is a kind of repository that organizes information for that purpose.

## Database

We store the structured data in the MongoDB database [^1]. The database is highly available, ie. has multiple equivalent sources at any time, and is backed up daily. Readers are referred to the [Collections]({{ reference_url }}/accounts/collections/) and [Infrastructure]({{ resources_url }}/infrastructure/overview/) sections to find out more about how individual items are stored and organized for access.  

## [ESSE Data Convention](convention.md)

[This section](convention.md) contains the explanation of the basics of the data convention employed. We particularly explain how we make use of the **JSON format** to structure the data about the [Entities]({{ reference_url }}/entities-general/overview/) and their respective [Properties]({{ reference_url }}/properties/overview/).

## Links

[^1]: [MongoDB Database, official website](https://www.mongodb.com/)
