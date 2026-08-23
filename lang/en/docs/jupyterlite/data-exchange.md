# Data Exchange with JupyterLite

## Overview

JupyterLite environment can exchange data (1) either directly with the platform or (2) with its sub-parts, such as the [Materials Designer]({{ interface_url }}/materials-designer/overview/).

## Get data inside JupyterLite

### General case
`get_data()` function is used to request data from the Platform or Materials Designer to be loaded into the variable `data_from_host` inside `globals()`.

This `data_from_host` variable is updated by JS extension in response to changes in material selection for Materials Designer, or loads API keys when launched from the [Platform top menu](accessing-jupyterlite.md/#2-mat3ra-platform).

For example, to work with materials from [Materials Designer]({{ interface_url }}/materials-designer/overview/), the user would request to write them into `materials_in` variable using the following code snippet:

```python
from utils.jupyterlite import get_data

get_data("materials_in", globals())
```

The first parameter specifies the name of the global variable `"materials_in"` where the received data will be stored. The second parameter, `globals()`, passes the globals of the current executing notebook.

### Materials Designer case

To make it simpler to work with materials from the Materials Designer, the `get_materials()` function is provided. It is a wrapper around `get_data()` function that requests materials from the Materials Designer and returns them as a list of materials in ESSE format.

```python
from utils.jupyterlite import get_materials

materials = get_materials(globals())
```

## Send data outside

### General case

To send the materials back to the Materials Designer, use the following code snippet:

```python
from utils.jupyterlite import send_data

materials = [material1, material2, ...]
send_data("materials", materials)
```

Parameters:

The first parameter specifies the data that is being sent, which is "materials" in case for materials, this shouldn't be changed. The second parameter is the list of materials in ESSE format.


### Materials Designer case

To send the materials back to the Materials Designer the `set_materials()` function is provided. It is a wrapper around `send_data()` function that sends materials to the Materials Designer.

In Jupyter Notebook opened with Python kernel, the materials are saved to the `uploads` folder in the directory with notebooks.

```python
from utils.jupyterlite import set_materials

materials = [material1, material2, ...]
set_materials(materials)
```
