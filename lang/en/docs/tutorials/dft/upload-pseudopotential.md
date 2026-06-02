# Upload a Custom Pseudopotential

This page explains how to upload a custom pseudopotential during simulation setup.


## 1. Default pseudopotentials

A set of default pseudopotentials is available for each application. The set is designed to provide flexibility in choosing chemical elements and reliability of results. For Quantum ESPRESSO, the platform uses [GBRV v1.5 potentials from Rutgers](#links). For VASP, v5.2 and v5.4 pseudopotential sets are supported.


## 2. Navigate to Job Designer

This tutorial assumes familiarity with navigating into the [Job Designer]({{ interface_url }}/jobs-designer/overview/) and opening the [workflow tab]({{ interface_url }}/jobs-designer/workflow-tab/).


## 3. Choose an alternative pseudopotential

On the workflow tab, navigate to the *Method* section and expand the *Pseudopotential* section. A list of all chemical elements that constitute the materials currently included in the job is displayed (e.g. if there are 2 materials — Si FCC and Ge FCC — two entries appear; the same applies if a single SiGe compound is chosen as the job material).

Next, click the input field (delete existing text if needed) to see the list of available pseudopotential options for each element. Text can be typed in the input field to narrow down the list (e.g. type "GW" or "1.0"). The items in the list show the basename of the pseudopotential file and the full path to it (as it is accessed during the calculation).

!!!note "Name and Path"
    Expert users can use the pseudopotential name and path when editing the input for workflow units.

Click one of the items in the list to select it as the pseudopotential for the chemical element in question.


## 4. Upload a pseudopotential

Custom pseudopotentials can be uploaded as demonstrated in the animation below. It is recommended to correctly indicate the exchange-correlation scheme and pseudopotential type during upload, as this information is useful for future work.

Uploaded pseudopotentials are associated with the corresponding element and become available during the job runtime at the path indicated by the selector item (see animation below).


## 5. Demonstration

The animation below demonstrates the process of choosing an alternative pseudopotential, filtering the list of available pseudopotentials, uploading a custom file, and navigating to it on the *Dropbox* page.

<img data-gifffer="/images/tutorials/pseudo-upload-view-in-dropbox.gif"/>


## 6. Links

1. [Quantum ESPRESSO UPF pseudopotentials list](http://www.quantum-espresso.org/pseudopotentials/)
1. [GBRV pseudopotential set](https://www.physics.rutgers.edu/gbrv/)
1. [Vienna Ab-initio Simulation Package, Website](https://www.vasp.at/)
