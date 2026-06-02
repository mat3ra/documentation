This page explains how to upload a custom pseudopotential during a simulation setup.

# Default pseudopotentials

We have a set of default pseudopotentials available for each application. Such a set is meant to provide flexibility in choosing chemical elements and reliability of results. For Quantum ESPRESSO we choose [gbrv v1.5 potentials from Rutgers](#links). For VASP we support v5.2 and v5.4 pseudopotential sets.

# Navigate into Job Designer

We will assume that reader knows how to navigate into the job designer and open the workflow tab (more information on that available in [quickstart](/getting-started/run-first-simulation/web-interface/) and [ui overview]({{ interface_url }}/ui/overview/).

# Choose alternative pseudopotential

When on the workflow tab, navigate to the "Method" section and expand the "Pseudopotential" section. You will see alist of all chemical elements that the constitute materials currently included into the job (ie. if there are 2 materials - Si FCC and Ge FCC you will see 2 entries, same will happen if there is one SiGe compound chosen as the job material).

Next click on the input field (delete text inside it if needed) to see the list of available pseudopotenial options for each element. You may type text in the input field to narrow down the list (eg. type "GW" or "1.0"). The items in the list show the basename of the pseudopotential file and the full path to it (as it will be accessed during the calculation).

!!! note "Name and Path"
    Expert users can use pseudopotential name and path when editing the input for workflow units.

Click on one of the items in the list to select it as the pseudopotential for the chemical element in question.

# Upload pseudopotential

Users may upload their custom pseudopotentials like it is demonstrated in the animation below. We encourage users to correctly indicate the exchange correlation scheme and pseudopotential type during upload as this information is likely to be useful during their future work.

Uploaded pseudopotentials will be automatically assoticated with the corresponding element and will be available during the job runtime at the path indicated by selector item (see video below).

# Demonstration

The animation below demonstrates the user experience for choosing an alternative pseudopotential, filtering the list of available pseudopotentials, uploading a custom file and navigating to it in "Dropbox" page.

<img data-gifffer="/images/tutorials/pseudo-upload-view-in-dropbox.gif"/>

# Links

1. [Quantum ESPRESSO UPF pseudopotentials list](http://www.quantum-espresso.org/pseudopotentials/)
1. [GBRV pseudopotential set](https://www.physics.rutgers.edu/gbrv/)
1. [Vienna ab-inito simulation package, Website](https://www.vasp.at/)
