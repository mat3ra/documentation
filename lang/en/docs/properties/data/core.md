# Core Schema Types

The core schema types are classified into **primitive** and **abstract** outlined below.

## Primitive

The primitive schemas are derived from the default JSON primitives and do not have physical meaning.

### 1D Data Series

Series is an array of arrays containing numbers or strings. It is used to store data

=== "Schema"
    ```json
    --8<-- "data/esse/schema/core/primitive/1d_data_series.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/core/primitive/1d_data_series.json"
    ```

### 3D Lattice

Holds the information about the three-dimensional periodic lattice specified through lengths and angles between lattice vectors.


=== "Schema"
    ```json
    --8<-- "data/esse/schema/core/primitive/3d_lattice.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/core/primitive/3d_lattice.json"
    ```

### Axis

Used for plotting. It has a label to describe the type of data on the axis and units to describe the units of the data.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/core/primitive/axis.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/core/primitive/axis.json"
    ```

## Abstract

The abstract schemas outline the data structure of abstract concepts (e.g. a point) and are derived from the primitive schemas.

### 2D Data

Data prepared for a two-dimensional plot.


=== "Schema"
    ```json
    --8<-- "data/esse/schema/core/abstract/2d_data.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/core/abstract/2d_data.json"
    ```

### 2D Plot

Two-dimensional data object, defined in conjunction with two axes.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/core/abstract/2d_plot.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/core/abstract/2d_plot.json"
    ```

### 3D Tensor

A tensor which can be represented as a 3x3 matrix (for example the stress tensor).

=== "Schema"
    ```json
    --8<-- "data/esse/schema/core/abstract/3d_tensor.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/core/abstract/3d_tensor.json"
    ```

### 3D Vector Basis

Three non-collinear vectors in three-dimensional space that form a basis set.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/core/abstract/3d_vector_basis.json"
    ```

=== "Example
    ``` josn
    --8<-- "data/esse/example/core/abstract/3d_vector_basis.json"
    ```

### Point

Point is a generic data type that is expected to be used by many different aspects of the database. It is an array holding three numbers.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/core/abstract/point.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/core/abstract/point.json"
    ```

### Vector

Vector is a generic data type that is expected to be used by many different aspects of the database. It is an array holding three numbers.

=== "Schema"
    ```json
    --8<-- "data/esse/schema/core/abstract/vector.json"
    ```

=== "Example"
    ```json
    --8<-- "data/esse/example/core/abstract/vector.json"
    ```
