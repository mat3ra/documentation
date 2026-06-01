# Upload Structures

We support uploading structural data in the file formats containing the lattice geometry and the ionic positions of the crystal structure under investigation. 

At present CIF, POSCAR and XYZ formats are supported [^1], [^2], [^3]. POSCAR format represents a standard way of defining and inputting crystal structure information to [VASP code]({{ guide_url }}/software-directory/modeling/vasp/overview/), one of the simulations engines incorporated into our platform. XYZ files are a common format for defining and inputting non-periodic molecular structures into simulation engines, such as NWChem[^4].

## Open Upload Dialog

Open the [Account Profile](../../accounts/ui/profile-page.md) page and [navigate]({{ interface_url }}/ui/specific/tabs-navigator/) to "Materials" tab. Then choose upload tool <i class="zmdi zmdi-upload zmdi-hc-border"></i> in the top right [actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar).

## Select Files

Click `Select Items` tool <i class="zmdi zmdi-collection-plus zmdi-hc-border"></i> in the [actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar), to open a file upload dialog. Through this dialog, select one or multiple files from the local filesystem. The files are processed by the web browser and arranged in a list prepared to be uploaded to our platform. This list also contains information about whether a certain file has already been used for uploading structural information before to avoid unnecessary repetitions.

### Expand Content

Textual data contained in each file can be further visualized by clicking its corresponding entry, and then collapsed back by clicking second time.  The same functionality can be accessed through `Expand` and `Collapse` tools located in the top-right [actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar) of the page, upon selection of the relevant structure file.

### Search

When large sets of files need to be imported at a single time, particular entries can be retrieved from the resulting list by [filtering](../../entities-general/actions/search.md) through the text bar at the top of the screen. 

### Tag

Users may tag structures with a list of keywords. This is especially resourceful when large datasets of imported files need to be retrieved or filtered later. The general guidelines for entering tags and attaching them to entities are presented [here](../../entities-general/actions/metadata.md).

#### Tagging a Structure as Non-Periodic
Users may wish to create a non-periodic structure when they upload a new structure by adding `"non-periodic"` as a tag.

### Set Filename Using File Content
A common feature of POSCAR and XYZ files is that the name of a structure may be written into the file itself. In POSCAR files the first line of the file often contains a string identifying the material. In XYZ files the second line of the file often contains a string identifying the material.
To update the name of a file based on the contents (first line of a POSCAR file, or second line of an XYZ file) the user can select the <i class="zmdi zmdi-comment-edit zmdi-hc-border"></i> button.

For example:

<b>Original Name:</b> material_0001.poscar

<b>File Content:</b>

```
H2O
1.0
  10.583540000	   0.000000000	   0.000000000
   0.000000000	  10.583540000	   0.000000000
   0.000000000	   0.000000000	  12.700250000
O H
1 2
direct
   0.000000000    0.500000000    0.000000000  O
   0.043139000    0.431029000    0.043078000  H
   0.036635000    0.576406000    0.035949000  H
```

<b>New Name:</b> H2O.poscar

### Upload Files

Next, the [selected](../../entities-general/actions/select.md) files can be uploaded to the platform by clicking `Upload` <i class="zmdi zmdi-upload zmdi-hc-border"></i> in the [actions toolbar](../../entities-general/ui/explorer.md#actions-toolbar). 

## View Materials

Once the files have been imported, they are added as entries to the Materials [collection]({{ reference_url }}/accounts/collections/). The name of the material is read from the imported file, if possible. Chemical formula is used as a backup option.  

## Animation

The aforementioned steps are demonstrated in the animation below.

<img data-gifffer="/images/materials/upload.gif" />

## Links

[^1]: [Syntax of the CIF file format, Website](https://www.iucr.org/resources/cif/spec/version1.1/cifsyntax)
[^2]: [Syntax of the POSCAR file format, Website](http://cms.mpi.univie.ac.at/vasp/guide/node59.html)
[^3]: [Wikipedia XYZ file format, Website](https://en.wikipedia.org/wiki/XYZ_file_format)
[^4]: [NWChem Manual, Website](https://nwchemgit.github.io/Home.html)
