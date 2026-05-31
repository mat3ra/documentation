# Create an interface between two materials in JupyterLite notebook

This tutorial explains how to create an interface between two materials in Materials Designer employing ZSL algorithm. Example is given for creating an interface between Graphene and Ni(111).

## Step 0: Open Materials Designer

We start with [opening](../../entities-general/actions/create.md) an instance of the [Materials Designer Interface](../../materials-designer/overview.md) for creating and designing new [Materials structures]({{ reference_url }}/materials/overview/) on our platform.

## Step 1: Import Materials

In order to use Graphene and Ni, the user should first [import](../../materials-designer/header-menu/input-output/import.md) sample crystalline structures of the two respective materials into the current Materials Designer session, from the account-owned [collection]({{ reference_url }}/accounts/collections/) of materials.

Another option is to use materials from a Standard Materials Dataset via [Import from Standata](../../materials-designer/header-menu/input-output/standata-import.md).

After importing, Graphene and Ni should be available in the materials list.

<img src="/images/materials-designer/import/graphene_and_ni_imported.webp" alt="Gr and Ni available in materials list"/>

## Step 2: Use JupyterLite Session Dialog

Navigate to `Advanced` > `JupyterLite Session` from the main interface.

  <img src="/images/tutorials/interface_with_zsl/1_select_jupyterlite_session.webp" alt="Open JupyterLite Dialog"/>

- In the Introduction notebook find the link to the example under `Examples` > `1. Builders / Transformations` > `1.1. Interface creation with Zur and McGill Superlattice algorithm`

  <img src="/images/tutorials/interface_with_zsl/2_introduction_notebook.webp" alt="Open Example Notebook"/>
  
- The link will open the example notebook in a new tab.

## Step 3: Run the Example

- Select Input Materials from the dropdown list to make them available in the notebook. (Ni and Graphene in this case)

  <img src="/images/tutorials/interface_with_zsl/3_select_materials.webp" alt="Select Input Materials"/>
  
- Run the cell marked as `Run first` to load the input materials into the notebook. (Loading is done asynchronously from outside JupyterLite kernel, so it may take a few seconds for the kernel to register)

  <img src="/images/tutorials/interface_with_zsl/4_load_materials.webp" alt="Run First Cell"/>
  
- Set Input Parameters for substrate and layer materials, resulting interface and the algorithm. (In this case, Ni regarded as the substrate and Graphene as the layer. Since unit lattices of Graphene and Ni(111) plane are close, we should reduce the maximum search area for superlattice matching to 100 Angstrom^2 to speed up the search)

  <img src="/images/tutorials/interface_with_zsl/5_set_input_parameters.webp" alt="Set Input Parameters"/>
  
- Click `Run` > `Run All` to run cells and wait for the results to appear. (Depending on the `MAX_AREA` parameter, the search may take from seconds to a few minutes to complete.)

  <img src="/images/tutorials/interface_with_zsl/6_run_all_cells.webp" alt="Run All Cells"/>

## Step 4: Analyze the Results
- Output of cell under "2. Install Packages" should display a list of successfully installed packages

  <img src="/images/tutorials/interface_with_zsl/7_installed_packages.webp" alt="Install Packages"/>
  
- Output of cell under "3.2. Print out the interfaces and terminations" should display the number of possible terminations (in this case 1) and the number of interfaces for each termination (in this case 1211)

  <img src="/images/tutorials/interface_with_zsl/9_found_interfaces.webp" alt="Print Interfaces and Terminations"/>
  
- Output of cell under "4.2. Print out interfaces with the lowest strain for each termination" should display the strain and number of atoms for the interface with the lowest strain for each termination.
- Output of cell under "5. Plot the results" should display a plot of the strain vs number of atoms for each interface. Each point on the plot represents an interface with data for termination, interface index, strain and number of atoms.

<img src="/images/tutorials/interface_with_zsl/10_plot_found_interfaces.webp" alt="Plot Results"/>

## Step 5: Select the Interfaces to Return
- Select the termination for the interface by setting variable `termination_index` to respective value (0 by default), and then the number of interfaces with lowest strain to return (by default set to 1).
- Verify that Output Materials dropdown contains the selected interface(s).
- Click "Submit" to pass materials to the Materials Designer session and take it from there.
- Graphene on Ni(111) interface should now be available in the materials list and can be viewed in the 3D viewer.

  <img src="/images/tutorials/interface_with_zsl/11_view_interface_in_md.webp" alt="Select Interfaces"/>
  
- We can add repetition alongside x and y directions and add bonds to see the result more clearly.

<img src="/images/tutorials/interface_with_zsl/12_add_repetition_and_bonds.webp" alt="Add repetitions and bonds"/>

## Links
- Zur and McGill Superlattice algorithm paper: (https://doi.org/10.1063/1.333084)
- Zur and McGill Superlattice algorithm implementation by PyMatGen documentation: (https://pymatgen.org/pymatgen.analysis.interfaces.html)