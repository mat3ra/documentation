# TensorFlow
[TensorFlow](https://www.tensorflow.org/) is a powerful open-source machine learning platform geared towards neural networks.

Currently, our support for TensorFlow is primarily through the [command-line interface]({{ cli_url }}/cli/overview/),
although we note that a custom [PythoML](python-ml/overview.md) workflow could be used to run TensorFlow workflows
through our web app (e.g. for hyperparameter tuning).

**A note on Python / Tensorflow compatibility:**
Keep in mind that TensorFlow's development is rapidly evolving, and thus its dependencies can suddenly change in new versions.
We recommend checking the
[official TensorFlow documentation](https://www.tensorflow.org/install/pip) to verify that the version of Python and
version of TensorFlow selected are compatible with one-another.

Key concerns to note are that:

  * [TensorFlow versions 1.X](https://pypi.org/project/tensorflow/1.15.5/) 
 are only compatible with Python releases earlier than Python 3.7.
  * Python 3.8 is only supported by [TensorFlow versions 2.2](https://www.tensorflow.org/install/pip) and later.

# Running TensorFlow

Tensorflow can either be run interactively, or by a job submission script.

## Job Submission Script
In order to run TensorFlow through a job submission script, first connect to Cluster-001 or Cluster-007, and
make a folder for the job.

```bash
cd ~/cluster-007
mkdir my_tensorflow_job
cd my_tensorflow_job 
```

Then, add the python script that we wish to run. For example, the following script can be used to test whether
TensorFlow can see the GPU when it runs.

```python
# Test whether TensorFlow can be imported
print("Importing TensorFlow", flush=True)
import tensorflow as tf

# Test whether TensorFlow sees the GPU
print("\nlisting physical devices:", flush=True)
print(tf.config.list_physical_devices())
```

Now that we have a Python script, we can create the job submission script. To access a GPU, we'll use the GOF queue.

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
# Name of the python script we want to run
pythonScriptFile="my_python_script.py"

# =======
# RUN JOB
# =======
module load cuda/11.5
module load python/3.9.1

# Install Tensorflow
virtualenv .env
source .env/bin/activate
pip3 install tensorflow-gpu

# Run TensorFlow
python3 $pythonScriptFile &> python_log.txt
```

Finally, the job can be submitted with qsub:

```bash
qsub my_job_script.sh
```

## Interactive Use

Oftentimes, it is useful to run TensorFlow interactively, for example to debug a script.
To run a TensorFlow job interactively, first create a job that will spin up a GPU instance. For example, the following
script will create a GPU instance that lasts one hour.

```bash
#!/bin/bash

#PBS -N TensorFlow-Test
#PBS -j oe
#PBS -l nodes=1
#PBS -l ppn=1
#PBS -l walltime=00:01:00:00
#PBS -q GOF

sleep 1h
```

Then, connect to the cluster that ran the job. In our example, we're running the GPU node on Cluster-007:

```bash
ssh cluster-007
```

From there, once the sleeper job has begun running, the node name can be found by running `qstat -f`. Connect via SSH.

The node's version of CUDA and its GPU drivers can be verified by running `nvidia-smi` while connected. Note that this 
command only exists on nodes that contain GPU nodes.

The CUDA module can be loaded, and TensorFlow's GPU version can be installed as follows:

```bash
module load cuda/11.5
module load python/3.9.1

virtualenv .env
source .env/bin/activate
pip3 install tensorflow-gpu
```
