# Developer Guide

This guide covers the technical infrastructure of the Mat3ra platform — REST API access, cluster hardware, and data storage internals.

!!!tip "Other documentation sites"
    For step-by-step tutorials, tool walkthroughs, CLI usage, and software reference, see the [Platform Guide](https://docs.mat3ra.com/guide/).
    For explanations of underlying concepts, see [Concepts & Reference](https://docs.mat3ra.com/reference/).


## REST API

Programmatic access to the Mat3ra platform.

- [Overview](rest-api/overview.md) — capabilities and entry points
- [Authentication](rest-api/authentication.md) — API token setup
- [Query structure](rest-api/query-structure.md) — filters, pagination, projections
- [Endpoints](rest-api/endpoints.md) — available resources
- [API client library](rest-api/api-client.md)
- [API examples](rest-api/api-examples.md) — common usage patterns


## Infrastructure

Cluster hardware, storage systems, and resource management.

- [Overview](infrastructure/overview.md) — architecture at a glance
- [Storage system](infrastructure/storage.md)
- [Login node](infrastructure/login/overview.md) — directories, access
- **Clusters**: [overview](infrastructure/clusters/overview.md), [hardware](infrastructure/clusters/hardware.md), [Google](infrastructure/clusters/google.md), [AWS](infrastructure/clusters/aws.md), [Azure](infrastructure/clusters/azure.md)
- **Resource management**: [overview](infrastructure/resource/overview.md), [categories](infrastructure/resource/category.md), [queues](infrastructure/resource/queues.md)
- **Compute parameters**: [overview](infrastructure/compute/overview.md), [parameters](infrastructure/compute/parameters.md), [data](infrastructure/compute/data.md)


## Data storage

How data is stored on disk and in object storage.

- **Data on disk**: [overview](data-on-disk/overview.md), [directory structure](data-on-disk/directories.md), [quotas](data-on-disk/quotas.md), [security](data-on-disk/security.md)
- **Object storage**: [overview](data-in-objectstorage/overview.md), [files](data-in-objectstorage/files.md), [security](data-in-objectstorage/security.md), [dropbox](data-in-objectstorage/dropbox.md)
