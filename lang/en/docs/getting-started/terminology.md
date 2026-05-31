# Terminology

We summarize here the basic concepts that are used throughout Exabyte.io when referring to simulations.

## Introduction

Useful properties of materials can be obtained either via experiments, from a pure analytical standpoint, or via the application of computational techniques, otherwise referred to as **simulations**. This latter case is what we employ at exabyte.io.

- **Simulation** is an application of a computational model or technique aimed at extracting a specific [property]({{ reference_url }}/properties/overview/) of [materials]({{ reference_url }}/materials/overview/).

There are three main concepts that we deal with:

- **Materials**: a combination of chemical elements in a particular geometric arrangement, that can be *uniquely* defined by a set of [descriptive properties]({{ reference_url }}/properties/classification/overview/) (eg. crystal lattice and basis), and has certain [characteristic properties]({{ reference_url }}/properties/classification/overview/) that can be computed upon it (eg. band gap, formation energy etc.). This includes both `periodic` (repeating units) and `non-periodic` (single unit) structures.

- **Models**: a [theory]({{ reference_url }}/models/overview/) that provides scientific insight on how to calculate the characteristic properties of a material; it can be applied via multiple possible **Methods**, or [numerical implementations]({{ reference_url }}/methods/overview/) of the Model. In practice, methods are enacted on our platform via the creation of **[Workflow Computations]({{ reference_url }}/workflows/overview/)** to be applied on the material.

!!!note "Example Model and Method"
    **Density Functional Theory (DFT)** is an [example of a model]({{ reference_url }}/models-directory/dft/overview/), and its **plane-wave pseudopotential formulation** is an [example of method]({{ reference_url }}/methods-directory/pseudopotential/overview/). Detailed theoretical reviews of such concepts can be found in the references listed [herein]({{ reference_url }}/models-directory/dft/references/).

- **Jobs**: an [entity]({{ reference_url }}/jobs/overview/) that contains information about the computation that makes the application of the Model (and subsequently Method) upon the material under investigation possible.

More explanation follows for each of the above concepts.

## Properties

We introduce the classification schemes of material properties, such as structural, electronic and thermodynamic properties, [in this section of the documentation]({{ reference_url }}/properties/classification/overview/).

## Model

Within our platform, multiple component concepts comprised within a model are employed:

- [Model]({{ reference_url }}/models/overview/)
- [Method]({{ reference_url }}/methods/overview/)
- [Workflow]({{ reference_url }}/workflows/overview/)
- [Subworkflow]({{ reference_url }}/workflows/components/subworkflows/)
- [Unit]({{ reference_url }}/workflows/components/units/)

### Components

In order to better understand the difference between Model, Method and Simulation, let us use a travel analogy:

1. When you set out to travel from San Francisco to New York, you know your destination. Therefore, by analogy, a specific address in New York would be a **characteristic property** that you would like to reach (obtain).

2. Then, you choose the way you would like to travel between a flight, a train ride, car ride or shipping. By analogy, after choosing the above-mentioned characteristic property of interest (the address), you choose the **model**.

3. When you board a plane in the airport, or sit into a car, you henceforth choose a specific class of aircraft (jet, propeller, supersonic) or automobile (sedan, SUV, convertible). By analogy, after choosing a model, you would need to choose a specific computational implementation of the model, or the **method**.

4. The plane could take multiple routes, and reach multiple intermediate destinations along the way. By analogy, a method can be realized through multiple **workflows** that contain specifically arranged **units**.

Thus, the process of traveling from San Francisco to New York by analogy would be the **simulation** using a model, and a corresponding method contained within it, employed to extract a specific characteristic property.

> A note on "Simulation Engines". Just like there are multiple airplane manufacturers, there are many **simulation engines** (or [software applications]({{ reference_url }}/software/overview/)) that implement specific model(s) and method(s).

## Jobs

A [simulation Job]({{ reference_url }}/jobs/overview/) is an [entity]({{ reference_url }}/entities-general/overview/) that represents the computation employed during the simulation, and the simplest entity that has [accounting]({{ reference_url }}/accounts/overview/) set up for. Jobs contain the information about the aforementioned Model/Method/Workflow/Units, and can be under any of the following possible [statuses]({{ reference_url }}/jobs/status/).

### Projects

Jobs are organized into [Projects]({{ reference_url }}/jobs/projects/) for convenience. One can think about projects as collections of jobs, in the same manner as a file system directory is a collection of files.
