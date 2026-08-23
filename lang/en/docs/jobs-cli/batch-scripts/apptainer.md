# Apptainer and Environment Modules

On the new platform, environment modules integrate with Apptainer to provide consistent, containerized runtimes for HPC applications. When you `module load` an application, the module system:

- Resolves and loads required dependencies (e.g., `gcc`, `mpi`)
- Sets per-application environment variables (e.g., `$EXEC_CMD_VASP`, `$EXEC_CMD_QE`)
- Updates a convenience variable `$EXEC_CMD` to the most recently loaded application's command
- Maintains `$EXEC_CMDS` as a colon-separated list of loaded application exec variables (e.g., `EXEC_CMD_VASP:EXEC_CMD_QE`)

## Example session

```bash
>>>> module load espresso/6.3-gcc-openmpi-openblas
The module gcc/11.2.0 is loaded
The module mpi/ompi-4.1.1 is loaded
The module espresso/6.3-gcc-openmpi-openblas is loaded

Loading espresso/6.3-gcc-openmpi-openblas
  Loading requirement: gcc/11.2.0 mpi/ompi-4.1.1

>>>> echo $EXEC_CMD
apptainer exec --bind /export,/scratch,/dropbox,/cluster-001-share \
  /export/compute/software/applications/espresso/6.3-gcc-openmpi-openblas/image.sif

>>>> echo $EXEC_CMDS
EXEC_CMD_QE

>>>> echo $EXEC_CMD_QE
apptainer exec --bind /export,/scratch,/dropbox,/cluster-001-share \
  /export/compute/software/applications/espresso/6.3-gcc-openmpi-openblas/image.sif

>>>> module load vasp/5.4.4-gcc-openmpi-openblas-fftw-scalapack
The module vasp/5.4.4-gcc-openmpi-openblas-fftw-scalapack is loaded

>>>> echo $EXEC_CMDS
EXEC_CMD_VASP:EXEC_CMD_QE

>>>> echo $EXEC_CMD
apptainer exec --bind /export,/scratch,/dropbox,/cluster-001-share \
  /export/compute/software/applications/vasp/5.4.4-gcc-openmpi-openblas-fftw-scalapack/image.sif

>>>> echo $EXEC_CMD_VASP
apptainer exec --bind /export,/scratch,/dropbox,/cluster-001-share \
  /export/compute/software/applications/vasp/5.4.4-gcc-openmpi-openblas-fftw-scalapack/image.sif
```

Notes:
- The Apptainer command binds common platform directories into the container (e.g., `/export`, `/scratch`, `/dropbox`, and the cluster share such as `/cluster-001-share`).
- `$EXEC_CMD` always points to the last loaded application's container exec command.
- Use per-app variables (e.g., `$EXEC_CMD_VASP`, `$EXEC_CMD_QE`) when you need to be explicit in job scripts.

## Using in job scripts

See:
- [Jobs via Command Line](../overview.md)
- [Batch Scripts > General Structure](general-structure.md)
- [Batch Scripts > Sample Scripts](sample-scripts.md)
