# Create Materials With VESTA under Remote Desktop

The present tutorial describes the steps necessary for connecting to our platform via a [Remote Desktop]({{ cli_url }}/remote-connection/remote-desktop/), in order to create and manipulate a [material structure]({{ reference_url }}/materials/overview/) through [VESTA]({{ reference_url }}/software-directory/analysis/vesta/) graphical analysis and visualization software.

We demonstrate how this new crystal structure can be retrieved within the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials, accessible via the [Materials Explorer]({{ interface_url }}/materials/ui/explorer/) of our [Web Interface]({{ interface_url }}/ui/overview/). This transfer of the structure information is achieved through the help of the [Dropbox functionality]({{ resources_url }}/data-in-objectstorage/dropbox/) of our platform.
 
Additional analysis software similar to VESTA can be retrieved under Remote Desktop, as introduced under the list presented [herein]({{ reference_url }}/software-directory/overview/#analysis-tools). 

## Accessing Remote Desktop

One must open a [Remote Desktop Connection]({{ cli_url }}/remote-connection/remote-desktop/) via our [Web Interface]({{ interface_url }}/ui/overview/) in order to run [graphical interface programs]({{ reference_url }}/software-directory/overview/#analysis-tools) for material analysis and visualization purposes. 

The instructions for opening and launching a Remote Desktop session can be found under [this page]({{ cli_url }}/remote-connection/actions/open-desktop/).

## Launching VESTA Visualization Software

The user should now [follow this procedure]({{ cli_url }}/remote-connection/actions-rd/open-app/) in order to start a session of the [VESTA]({{ reference_url }}/software-directory/analysis/vesta/) graphical materials analysis software.

!!!warning "Avoid compute intensive visualization tasks"
    We kindly ask users to avoid running excessively intensive visualization tasks when interacting with analysis software such as VESTA, as it may interfere with other users' operations during the course of their execution.

## Use VESTA to Create a New Crystal Structure 

We use VESTA to create a new crystal structure consisting in **bcc Iron**, taken in its two-atom conventional unit cell representation. We remind the reader about the basic features of such a crystal structure.

- Space Group: Im-3m

- Bravais Lattice: body-centred cubic

- Lattice Constant: 2.87 Angstrom

- Atomic Positions of Fe atoms: (0,0,0); (1/2,1/2,1/2)

A visual representation of the bcc Iron crystal structure is portrayed below.

![bcc Iron Crystal Structure](../../images/tutorials/bcc-iron-crystal-structure.png "bcc Iron Crystal Structure")

### Open New Structure Dialog

In order to create a new material structure through VESTA, the user should click the "New Structure" option at the top of the File Menu, accessible at the top-left corner of the VESTA graphical user interface. 

Doing this will open a "New Data" dialog, with which new crystal structures such as bcc Iron can be defined by entering their relevant crystallographic structural information and parameters.
 
### Insert Lattice Parameters and Atomic Positions
 
The user should first enter the aforementioned lattice parameters of the Iron body-centred cubic unit cell under the "Unit Cell" tab of the dialog. Here, the relevant cubic space group (Im-3m, number 229) can also be selected.
 
Secondly, the atomic positions and chemical identity of the atoms present within the crystal structure should be inserted within the "Structure Parameters" tab, by clicking on "New" button every time a new atom is added on top of those already listed under the central table in this tab. In our case, only a single Fe atom at the origin needs to be added, since the second atom at the centre of the unit cell is already related to it by the space group symmetry selected in the preceding step.

At the end of entering the appropriate crystallographic data for bcc Iron, the "New Data" dialog should be closed and the corresponding changes recorded by clicking the `OK` button at the bottom of the dialog. The view will hence be returned to the main VESTA interface, with which the crystal structure of bcc Iron can be visualized and manipulated graphically at will by the user.

## Save Structure as POSCAR to Dropbox

Following the creation of the bcc Iron crystal structure within VESTA, the associated structural data can then be exported under the POSCAR file format directly to the [Dropbox Folder]({{ resources_url }}/data-in-objectstorage/dropbox/), affording for the simultaneous sharing of files between all [nodes of our platform]({{ resources_url }}/infrastructure/overview/). This should be done by clicking the "Export Data" option under the top-left "File" menu of the VESTA interface.

Under the resulting "Export Data" dialog, the [dropbox folder]({{ resources_url }}/data-on-disk/directories/#dropbox) accessible via the user's [home folder]({{ resources_url }}/infrastructure/login/directories/) should be selected, and the appropriate POSCAR file format should be chosen under the bottom-right menu of the dialog. A suitable filename can also be entered at the top for later easier retrieval of the file. The interface will finally allow the user to choose between saving the crystallographic atomic position data in fractional or Cartesian coordinates, and whether to convert the crystal structure to its Niggli reduced cell representation. 

## Download Structure

The user can now exit the Remote Desktop session and return to the main [Web Interface]({{ interface_url }}/ui/overview/) of our platform. The same crystallographic POSCAR file saved in the preceding step can now be retrieved again under the [Dropbox Page]({{ interface_url }}/data-in-objectstorage/ui/dropbox-page/), accessible through the main [Left-hand Sidebar Menu]({{ interface_url }}/ui/left-sidebar/) of the Web Interface.

The POSCAR file should be downloaded to the local disk by following [these instructions]({{ interface_url }}/data-in-objectstorage/actions/download/).

## Upload Structure to Materials Collection

After switching to the [Materials Explorer Page]({{ interface_url }}/materials/ui/explorer/), this same POSCAR file can then be uploaded again into our platform, and thus added to the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials. Uploading a POSCAR structure file is accomplished as explained under [this page]({{ interface_url }}/materials/actions/upload/).

## Animation 

The steps narrated in the preceding paragraphs of the present tutorial page are illustrated in the below video.
 
We begin with the creation and visualization of a new bcc Iron crystal structure through the [VESTA]({{ reference_url }}/software-directory/analysis/vesta/) analysis software, incorporated into our [Remote Desktop Interface]({{ cli_url }}/remote-connection/remote-desktop/).
 
We conclude this animation by saving the crystal structure data under the POSCAR format to the [Dropbox Folder]({{ resources_url }}/data-in-objectstorage/dropbox/), and by later retrieving it under the Web Interface in order to upload it and inserting it into the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials. This new material entry is finally inspected under the [Materials Viewer Interface]({{ interface_url }}/materials/ui/viewer/).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/F6WyEPKiRfY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
