# Running Jobs via Command Line Interface

This page explains how to run a [job]({{ reference_url }}/jobs/overview/) via the [Command Line Interface]({{ cli_url }}/cli/overview/) (CLI) of our platform. The reader is recommended to first consult the [relevant part of the documentation]({{ cli_url }}/jobs-cli/overview/) before proceeding further with the present Tutorial.
 
Here, we will use a template input file and a bash script to sweep the lattice parameter space for a given structure. We will use [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/) as an example simulations engine, however all command-line related directives apply universally.

## 1. Input File

We start with preparing an **input file** for [Quantum ESPRESSO]({{ reference_url }}/software-directory/modeling/quantum-espresso/overview/). Below is an example input file for performing a total ground-state "self-consistent field" (scf) energy computation, with pseudopotential paths set to use the default **"gbrv" set of pseudopotentials** [^1] implemented on our platform. 

The material being considered in this particular example is a supercell of  "Strontium Zirconate" (SrZrO3), in its ground state equilibrium crystal structure with space group "Pnma" [^2]. The reader is referred to the official documentation for the "PWscf" module of Quantum ESPRESSO [^3] [^4] for a description of the keyword parameters contained here.

```fortran
&control
    calculation = 'scf',
    restart_mode = 'from_scratch',
    prefix = 'srzro'
    tstress =.true.
    tprnfor=.true.
    outdir = './_outdir'
    wfcdir = './'
    prefix = '${celldm1}'
    pseudo_dir = './_pseudo'
 /
 &system
    ibrav = 1
    celldm(1) = ${celldm1},
    nat = 40
    ntyp = 3
    ecutwfc = 40
    ecutrho = 200
    tot_charge = 0
/
&electrons
   mixing_beta = 0.7
   conv_thr = 1.0d-8
/
ATOMIC_SPECIES
 Sr 87.62     sr_pbe_gbrv_1.0.upf
 Zr 91.224    zr_pbe_gbrv_1.0.upf
 O  15.999    o_pbe_gbrv_1.2.upf
ATOMIC_POSITIONS (crystal)
Zr     0.250000000         0.250000000         0.250000000
Zr     0.750000000         0.250000000         0.250000000
Zr     0.250000000         0.750000000         0.250000000
Zr     0.750000000         0.750000000         0.250000000
Zr     0.250000000         0.250000000         0.750000000
Zr     0.750000000         0.250000000         0.750000000
Zr     0.250000000         0.750000000         0.750000000
Zr     0.750000000         0.750000000         0.750000000
Sr     0.000000000         0.000000000         0.000000000
Sr     0.500000000         0.000000000         0.000000000
Sr     0.000000000         0.500000000         0.000000000
Sr     0.500000000         0.500000000         0.000000000
Sr     0.000000000         0.000000000         0.500000000
Sr     0.500000000         0.000000000         0.500000000
Sr     0.000000000         0.500000000         0.500000000
Sr     0.500000000         0.500000000         0.500000000
O      0.000000000         0.250000000         0.250000000
O      0.250000000         0.000000000         0.250000000
O      0.250000000         0.250000000         0.000000000
O      0.500000000         0.250000000         0.250000000
O      0.750000000         0.000000000         0.250000000
O      0.750000000         0.250000000         0.000000000
O      0.000000000         0.750000000         0.250000000
O      0.250000000         0.500000000         0.250000000
O      0.250000000         0.750000000         0.000000000
O      0.500000000         0.750000000         0.250000000
O      0.750000000         0.500000000         0.250000000
O      0.750000000         0.750000000         0.000000000
O      0.000000000         0.250000000         0.750000000
O      0.250000000         0.000000000         0.750000000
O      0.250000000         0.250000000         0.500000000
O      0.500000000         0.250000000         0.750000000
O      0.750000000         0.000000000         0.750000000
O      0.750000000         0.250000000         0.500000000
O      0.000000000         0.750000000         0.750000000
O      0.250000000         0.500000000         0.750000000
O      0.250000000         0.750000000         0.500000000
O      0.500000000         0.750000000         0.750000000
O      0.750000000         0.500000000         0.750000000
O      0.750000000         0.750000000         0.500000000
K_POINTS (automatic)
3 3 3 1 1 1
```

Note that we are using a template variable in place of `celldm(1)`, indicating the lattice parameter of the underlying simple cubic [Bravais Lattice]({{ reference_url }}/properties-directory/structural/lattice/) of the crystal structure. These template variables are defined once the combined `run.sh` script is put together, as explained in what follows.

We also need to copy the pseudopotential files into the current [working directory]({{ cli_url }}/jobs-cli/batch-scripts/directories/) where the input file is stored, as follows.

```bash
cp /export/share/pseudo/si/gga/pbe/gbrv/1.0/us/sr_pbe_gbrv_1.0.upf .
cp /export/share/pseudo/zr/gga/pbe/gbrv/1.0/us/zr_pbe_gbrv_1.0.upf .
cp /export/share/pseudo/o/gga/pbe/gbrv/1.0/us/o_pbe_gbrv_1.2.upf .
```

## 2. Batch Script

Secondly, we prepare the [Batch Script]({{ cli_url }}/jobs-cli/batch-scripts/overview/) necessary for [submitting jobs via CLI]({{ cli_url }}/jobs-cli/overview/).

```bash
#!/bin/bash
#PBS -A ${PROJECT}
#PBS -M ${EMAIL}
#PBS -N SrZrO3
#PBS -l nodes=1
#PBS -l ppn=16
#PBS -q SR
#PBS -j oe
#PBS -l walltime=02:00:00
#PBS -m abe

module add espresso
cd $PBS_O_WORKDIR
# $EXEC_CMD is set by the environment module
mpirun -np $PBS_NP $EXEC_CMD pw.x -in pw.in > pw.out
```

Just like before, we are using template variables again instead of the [project]({{ reference_url }}/jobs/projects/) name and email. Variables starting with `$PBS` are automatically set by the [resource manager]({{ resources_url }}/infrastructure/resource/overview/), and are known as the ["PBS Directives"]({{ cli_url }}/jobs-cli/batch-scripts/directives/). 

The rest of the Batch Script contains UNIX commands necessary for [loading the required modules]({{ cli_url }}/cli/actions/modules-actions/) and running the executables in parallel.

## 3. Shell Script

The logic for parameter sweep calculations through shell scripting can be summarized as below (in pseudo code).

```bash
#!/bin/sh
for celldm1 in 5.81 5.82 5.83
do
    render_input_file(celldm1)
    render_job_submission_script(email, project)
    submit_job("cluster-001")
done
```

## 4. Combined Input Script

When combined together, all the above components give the following structure.

```bash
#!/bin/sh

# ---------------------------------------------------------- #
#                                                            #
#  Example job submission script for Exabyte.io platform     #
#                                                            #
#  Combines bash and resource management directives:         #
#                                                            #
#    1. creates input files for simulations                  #
#    2. creates resource management scripts (PBS)            #
#    3. submits resource management scripts for execution    #
#                                                            #
# ---------------------------------------------------------- #

# Email to receive info on job progress
EMAIL="user@exabyte.io"

# ---------------------------------------------------------- #
#  Quantum ESPRESSO pseudopotentials                         #
# ---------------------------------------------------------- #
mkdir -p _pseudo
cp /export/share/pseudo/sr/gga/pbe/gbrv/1.0/us/sr_pbe_gbrv_1.0.upf ./_pseudo 
cp /export/share/pseudo/zr/gga/pbe/gbrv/1.0/us/zr_pbe_gbrv_1.0.upf ./_pseudo
cp /export/share/pseudo/o/gga/pbe/gbrv/1.2/us/o_pbe_gbrv_1.2.upf ./_pseudo

for celldm1 in 5.81 5.82 5.83
do
# ---------------------------------------------------------- #
#  Quantum ESPRESSO input file                               #
# ---------------------------------------------------------- #
    cat > srzro3_${celldm1}.in <<EOF
&control
    calculation = 'scf',
    restart_mode = 'from_scratch',
    prefix = 'srzro'
    tstress =.true.
    tprnfor=.true.
    outdir = './_outdir'
    wfcdir = './'
    prefix = '${celldm1}'
    pseudo_dir = './_pseudo'
 /
 &system
    ibrav = 1
    celldm(1) = ${celldm1},
    nat = 40
    ntyp = 3
    ecutwfc = 40
    ecutrho = 300
    tot_charge = 0
/
&electrons
   mixing_beta = 0.7
   conv_thr = 1.0d-8
/
ATOMIC_SPECIES
 Sr 87.62     sr_pbe_gbrv_1.0.upf
 Zr 91.224    zr_pbe_gbrv_1.0.upf
 O  15.999    o_pbe_gbrv_1.2.upf
ATOMIC_POSITIONS (crystal)
Zr     0.250000000         0.250000000         0.250000000
Zr     0.750000000         0.250000000         0.250000000
Zr     0.250000000         0.750000000         0.250000000
Zr     0.750000000         0.750000000         0.250000000
Zr     0.250000000         0.250000000         0.750000000
Zr     0.750000000         0.250000000         0.750000000
Zr     0.250000000         0.750000000         0.750000000
Zr     0.750000000         0.750000000         0.750000000
Sr     0.000000000         0.000000000         0.000000000
Sr     0.500000000         0.000000000         0.000000000
Sr     0.000000000         0.500000000         0.000000000
Sr     0.500000000         0.500000000         0.000000000
Sr     0.000000000         0.000000000         0.500000000
Sr     0.500000000         0.000000000         0.500000000
Sr     0.000000000         0.500000000         0.500000000
Sr     0.500000000         0.500000000         0.500000000
O      0.000000000         0.250000000         0.250000000
O      0.250000000         0.000000000         0.250000000
O      0.250000000         0.250000000         0.000000000
O      0.500000000         0.250000000         0.250000000
O      0.750000000         0.000000000         0.250000000
O      0.750000000         0.250000000         0.000000000
O      0.000000000         0.750000000         0.250000000
O      0.250000000         0.500000000         0.250000000
O      0.250000000         0.750000000         0.000000000
O      0.500000000         0.750000000         0.250000000
O      0.750000000         0.500000000         0.250000000
O      0.750000000         0.750000000         0.000000000
O      0.000000000         0.250000000         0.750000000
O      0.250000000         0.000000000         0.750000000
O      0.250000000         0.250000000         0.500000000
O      0.500000000         0.250000000         0.750000000
O      0.750000000         0.000000000         0.750000000
O      0.750000000         0.250000000         0.500000000
O      0.000000000         0.750000000         0.750000000
O      0.250000000         0.500000000         0.750000000
O      0.250000000         0.750000000         0.500000000
O      0.500000000         0.750000000         0.750000000
O      0.750000000         0.500000000         0.750000000
O      0.750000000         0.750000000         0.500000000
K_POINTS (automatic)
3 3 3 0 0 0
EOF

# ---------------------------------------------------------- #
#  Resource manager directives (PBS)                         #
# ---------------------------------------------------------- #
    cat > run_QE_${celldm1}.pbs <<-EOF
#!/bin/bash
#PBS -M ${EMAIL}
#PBS -N SrZrO3
#PBS -l nodes=1
#PBS -l ppn=16
#PBS -q OR
#PBS -j oe
#PBS -l walltime=02:00:00
#PBS -m abe

module add espresso
cd \$PBS_O_WORKDIR
mpirun -np \$PBS_NP $EXEC_CMD pw.x -in srzro3_${celldm1}.in | tee srzro3_${celldm1}.out
EOF
    qsub run_QE_${celldm1}.pbs
done

```

The reader should note that within the `mpirun` command we make use of the `tee` command. This redirects the output of the simulation to both the standard output (abbreviated as "stdout") and to the output file simultaneously. Redirecting to "stdout" in this way allows the status of the job to be regularly updated and refreshed under the corresponding [Job Viewer]({{ interface_url }}/jobs/ui/viewer/) in the [Web Interface]({{ interface_url }}/ui/overview/), as demonstrated in [another Tutorial](cli-job-import.md).

We can put the content of the above file into a bash script called `run.sh` for example, and then make the script executable with `chmod a+x run.sh` command.
 
The job can finally be [submitted]({{ cli_url }}/jobs-cli/actions/submit/) as a set to the [Resource Manager]({{ resources_url }}/infrastructure/resource/overview/) by invoking the script via the `./run.sh` command (the `qsub` command is not necessary in this case since it is already included as part of `run.sh`, towards the end of the script).

## 5. View Submitted Jobs

The user can view the currently submitted jobs and their statuses in CLI with the `qstat` [command]({{ cli_url }}/jobs-cli/actions/check-status/). 

The reader is referred to the video below for an explanation on how to inspect the results of the above simulation under the [Web Interface]({{ interface_url }}/ui/overview/) of our platform.


## 6. Animation

We summarize the above-mentioned steps in the following video. 

Here, we begin by entering the [Command Line Interface]({{ cli_url }}/cli/overview/) via the [Web Terminal]({{ cli_url }}/remote-connection/web-terminal/) connection method. We then navigate to the directory containing the `run.sh` script under the [Home Folder]({{ resources_url }}/infrastructure/clusters/directories/) of `cluster-007`, where we submit it for execution. 

We conclude by inspecting the [status of the job]({{ cli_url }}/jobs-cli/actions/check-status/) on the selected cluster number "007" by entering the `watch qstat` command, for an automatically-refreshing version of `qstat`. Since only one lattice parameter was tested in this example animation for simplicity, only one job has been launched and is returned by `qstat` in this case (scanning over all three lattice parameters, as in the original script shown above, would have correspondingly launched three distinct jobs).

<div class="video-wrapper">
<iframe class="gifffer" width="100%" height="100%" src="https://www.youtube.com/embed/sXKvHahZdoA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## 7. Links

[^1]: [GBRV pseudopotential library, Official Website](https://www.physics.rutgers.edu/gbrv/)

[^2]: [Strontium Zirconate, Materials Project Website](https://materialsproject.org/materials/mp-4387/)

[^3]: [PWscf User’s Guide, Document](https://www.quantum-espresso.org/Doc/pw_user_guide.pdf)

[^4]: [PWscf Input File Description, Website](https://www.quantum-espresso.org/Doc/INPUT_PW.html)
