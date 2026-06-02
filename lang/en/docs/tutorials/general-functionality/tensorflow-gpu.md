# Using Tensorflow (GPU)

TensorFlow [^1] is a powerful oepn-source machine-learning platform geared towards neural networks.

In this tutorial, we will create an [Anaconda]({{ cli_url }}/cli/modules/) environment for TensorFlow, and will run a test job
on a [GPU]({{ resources_url }}/infrastructure/resource/category/) queue within [AWS]({{ resources_url }}/infrastructure/clusters/aws/).

## 1. Create the Test Job

First, we'll create a folder for our job from `~/cluster-001` and enter into it:

```bash
cd ~/cluster-001
mkdir tensorflow_gpu_test
cd tensorflow_gpu_test
```

We can now populate our job folder with three files: `test.py`, `environment.yaml`, and `job.pbs`.

### test.py

Next, we can create a test Python script, to show whether TensorFlow sees the GPUs on the GPU node. We will name
it `test.py`:

```python
# Test whether TensorFlow can be imported
print("Importing TensorFlow", flush=True)
import tensorflow as tf

# Test whether TensorFlow sees the GPU
print("\nlisting physical devices:", flush=True)
print(tf.config.list_physical_devices())
```

### environment.yaml

We'll then configure our conda environment for the job. This can be accomplished using Anaconda's
robust `environment.yaml` system [^2]. Because we want to use TensorFlow on a GPU node, we will install only the
`tensorflow-gpu` package. If other packages were required, they could be added as a new entry in `dependencies`.
The `environment.yaml` we will use is below:

```yaml
name: tfgpu
channels:
  - defaults
dependencies:
  - tensorflow-gpu
prefix: tfgpu
```

### job.pbs

We'll finish our job setup by writing a PBS [submission script]({{ cli_url }}/jobs-cli/batch-scripts/overview/) to take care
of setting up the TensorFlow environment and running the Python script. We will name this file `job.pbs`:

```bash
#!/bin/bash

#PBS -N TensorFlow-Test
#PBS -j oe
#PBS -l nodes=1
#PBS -l ppn=1
#PBS -l walltime=00:00:10:00
#PBS -q GOF

# ===================
# CONFIG FOR THIS JOB
# ===================
# condaModule is taken directly from the list of installed modules.
# The full list can be found by running `module avail`
condaModule="python/anaconda3-5.2.0"

# Name of the environment file we created
tfEnvironmentFile="environment.yaml"

# Name of the python script we want to run
pythonScriptFile="test.py"


# =======
# RUN JOB
# =======
# Create the environment and install TensorFlow
module load $condaModule
conda env create -f $tfEnvironmentFile --force &> conda_install_log.txt

# Activate the TensorFlow environment we created
environmentName=$( grep "name:" $tfEnvironmentFile | head -n1 | awk '{print $NF}' )
source activate $environmentName

# Run TensorFlow
python $pythonScriptFile &> python_log.txt
```

The above script will run on a single GPU node with a single CPU core reserved (the job will still have access to the
GPU resource), for at most 10 minutes. To help make the script easier to modify for production work, we have included
three environment variables in the configuration section:

- condaModule: This is the name of the desired version of Anaconda, which can be found by calling `module avail`
- tfEnvironmentFile: This is the name of the environment file we want to use, in this case it is the `environment.yaml`
  file we created earlier.
- pythonScriptFile: This is the name of the python script we want to run. In this case, it is the `test.py` script we
  created earlier.

The job wil then run, first installing all the modules specified in `environment.yaml`. A log of the installation will
be saved to `conda_install_log.txt`. Note the use of the `--force` option; this will over-write any conda environments
with the same name that was specified in `environment.yaml`.

The job will then source the environment, and will run the python script. The python script's stodut and stderr will be
written to `python_log.txt`.

## 2. Submit the Test Job

We are now ready to submit our test job. From inside the `cluster-001/tensorflow_gpu_test` where we placed our files:

```bash
qsub job.pbs
```

The job will enter the GPU queue, and after a few minutes should start. The job's
status [can be monitored]({{ cli_url }}/jobs-cli/actions/check-status/) with the `qstat` command.

## 3. Analyze the Results

After the job completes, we will see several files in the job directory.

`conda_install_log.txt` will contain a log of the conda installation process, showing which libraries were downloaded.
This is useful for debugging or aiding in the reproducibility of results.

`shell.out`, which contains anything that would have been printed to the screen in the job.

`python_log.txt` contains a log of the stdout and stderr from the Python job. It may look something like:

```text
Importing TensorFlow
2021-03-25 00:32:43.766494: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcudart.so.10.1

listing physical devices:
2021-03-25 00:32:57.337563: I tensorflow/compiler/jit/xla_cpu_device.cc:41] Not creating XLA devices, tf_xla_enable_xla_devices not set
2021-03-25 00:32:57.340276: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcuda.so.1
2021-03-25 00:32:58.027658: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:941] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
2021-03-25 00:32:58.028227: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1720] Found device 0 with properties:
pciBusID: 0000:00:1e.0 name: Tesla V100-SXM2-16GB computeCapability: 7.0
coreClock: 1.53GHz coreCount: 80 deviceMemorySize: 15.78GiB deviceMemoryBandwidth: 836.37GiB/s
2021-03-25 00:32:58.028260: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcudart.so.10.1
2021-03-25 00:32:58.176165: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcublas.so.10
2021-03-25 00:32:58.176246: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcublasLt.so.10
2021-03-25 00:32:58.323200: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcufft.so.10
2021-03-25 00:32:58.549187: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcurand.so.10
2021-03-25 00:32:58.679114: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcusolver.so.10
2021-03-25 00:32:58.768426: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcusparse.so.10
2021-03-25 00:32:59.036819: I tensorflow/stream_executor/platform/default/dso_loader.cc:49] Successfully opened dynamic library libcudnn.so.7
2021-03-25 00:32:59.037031: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:941] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
2021-03-25 00:32:59.037623: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:941] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
2021-03-25 00:32:59.038052: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1862] Adding visible gpu devices: 0
[PhysicalDevice(name='/physical_device:CPU:0', device_type='CPU'), PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]
```

In this output, we can see that a single GPU was found: an nVidia TESLA V100-SXM2-16GB. In this case, this is the GPU
that would have been used by TensorFlow to perform its calculations.

## Links

[^1]: [TensorFlow Documentation](https://www.tensorflow.org/)

[^2]: [Managing Environments, Anaconda Documentation](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
