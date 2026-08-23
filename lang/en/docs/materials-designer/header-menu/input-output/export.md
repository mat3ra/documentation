# Export

The `Input/Output` menu offers the possibility to export the numerical crystallographic information associated with the selected structure to your local hard drive. This data export can be stored in either the JavaScript Object Notation (JSON) format [^1] [^2] or the POSCAR format [^3].
 
## Select "Export" Option 
 
Click on the `Export` <i class="zmdi-download zmdi-hc-border"></i> option, and an "Export Items" dialog will appear as highlighted in the figure below:
 
![Select "Export" Option](../../../images/materials-designer/export-items.png "Select Export Option")

 
## Open The Export Dialog
 
Here the user can choose between the JSON and POSCAR file formats using the drop-down menu field. The user can also choose either to export all materials from the [items list sidebar](../../sidebar-items.md) (Export all = yes) or just the currently selected one (Export all = no). 

## Run Export

Next, press the `OK` button, or press `Cancel` to revert to the previous screen. 

> NOTE: when exporting multiple files, a popup warning dialog might appear in your web browser. In this case, select the suitable option to accept such popups and save multiple files at once.

## Animation

An example of export procedure is portrayed in the animation below. Here, we select a material (MgO2) from the list on the left-hand sidebar, and we export it to the local "Downloads" folder on our hard drive in POSCAR format. 

<img data-gifffer="/images/materials-designer/ExportMaterialsDesigner.gif" />


## Links

[^1]: [JSON format specifications, Website](https://www.json.org/)
[^2]: [How we at Exabyte store atomistic information, Link]({{ data_url }}/materials/data/)
[^3]: [The POSCAR file format, Website](http://cms.mpi.univie.ac.at/vasp/guide/node59.html)
