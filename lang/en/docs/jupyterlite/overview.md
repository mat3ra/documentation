---
# YAML header
render_macros: true
---

# Introduction to JupyterLite

The [**JupyterLite**](https://jupyterlite.readthedocs.io/en/stable/) environment is a lightweight implementation of JupyterLab that runs entirely in the web browser. Without the need for setup and installation, user can open, edit and run Jupyter notebooks.

{% with origin_url="https://jupyter.org/try-jupyter/lab/" %}
{% include 'jupyterlite_embed.html' %}
{% endwith %}

## JupyterLite Environment

The JupyterLite environment facilitates access to Jupyter notebooks with data from the main application. 
It enables users to modify materials using Python and Jupyter notebooks with widely used packages such as `mat3ra-made`, `numpy`, `pymatgen`, and `ASE`.

## [Pyodide](./pyodide.md)

Introduces Pyodide -- kernel used in JupyterLite to run Python code in the browser.


## [Accessing JupyterLite](./accessing-jupyterlite.md)
Provides a detailed guide on how to access JupyterLite via the **Materials Designer**, **Mat3ra Platform**, or a direct URL, with accompanying visuals.

## [Authentication](./authentication.md)
Explains how to authenticate in Jupyter notebooks, with step-by-step instructions for the browser-based authentication process.

## [Dependencies Installation and Imports](./dependencies-installation.md)

Explains how to install dependencies in Pyodide using the `micropip` package, with code snippets for installing the `numpy` package and the `mat3ra-api-examples` package.

## [Data Exchange](./data-exchange.md)
Explains how to transfer data between JupyterLite and Materials Designer, including code snippets for importing and exporting materials data.

## [File Storage and Synchronization](./file-storage-synchronization.md)
Describes how JupyterLite stores files locally in the browser, discusses synchronization limitations across devices, and outlines steps for clearing the local cache when updates are available.

## [Common Actions](./common-actions.md)
Covers the available actions in JupyterLite, including how to open, run, upload, and copy notebooks, with instructions on executing these actions.

## Links

- [JupyterLite Documentation](https://jupyterlite.readthedocs.io/en/stable/)
