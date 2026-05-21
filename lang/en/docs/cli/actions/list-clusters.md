# List and Status of Clusters

The available [clusters and cluster nodes]({{ dev_url }}/infrastructure/clusters/overview/) can be listed under the [Command Line Interface](../overview.md), and their statuses inspected, with the `exaclusters` and `exanodes` commands respectively. 

## List Clusters 

An example of output of the `exaclusters` command allowing to list available clusters is shown below.

```bash
>>> exaclusters
ALIAS        HOSTNAME
-----------  ------------------------------------------------
cluster-001  master-production-20160630cluster-001.exabyte.io
cluster-007  master-production-20160630cluster-007.exabyte.io
```

## List Cluster Nodes

An example of the output of the other `exanodes` command allowing to list available cluster nodes is included below.

```bash
>>> exanodes
master-production-20160630-cluster-001.exabyte.io
     state = free
     power_state = Running
     np = 4
     properties = D,zone-a
     ntype = cluster
     status = rectime=1545445103,macaddr=02:28:a8:18:ec:a9,cpuclock=Fixed,varattr=,jobs=,state=free,netload=2779926834388,gres=,loadave=0.00,ncpus=8,physmem=15233668kb,availmem=8042900kb,totmem=15
233668kb,idletime=362839,nusers=1,nsessions=1,sessions=32664,uname=Linux master-production-20160630-cluster-001.exabyte.io 3.10.0-862.14.4.el7.x86_64 #1 SMP Wed Sep 26 15:12:11 UTC 2018 x86_64,ops
ys=linux
     mom_service_port = 15002
     mom_manager_port = 15003

comp-001-zone-a-production-20160630-cluster-001.exabyte.io
     state = job-exclusive
     power_state = Running
     np = 36
     properties = OR,zone-a
     ntype = cluster
     jobs = 0-35/63779.master-production-20160630-cluster-001.exabyte.io
     status = rectime=1545445128,macaddr=02:f8:61:41:de:4a,cpuclock=Fixed,varattr=,jobs=63779.master-production-20160630-cluster-001.exabyte.io(cput=92990,energy_used=0,mem=1481404kb,vmem=20866880
kb,walltime=2639,session_id=4895),state=free,netload=2932195108,gres=,loadave=36.41,ncpus=36,physmem=61663128kb,availmem=60376880kb,totmem=61663128kb,idletime=3489,nusers=1,nsessions=1,sessions=48
95,uname=Linux comp-001-zone-a-production-20160630-cluster-001.exabyte.io 3.10.0-862.14.4.el7.x86_64 #1 SMP Wed Sep 26 15:12:11 UTC 2018 x86_64,opsys=linux
     mom_service_port = 15002
     mom_manager_port = 15003

master-production-20160630-cluster-007.exabyte.io
     state = free
     power_state = Running
     np = 4
     properties = D,zone-a
     ntype = cluster
     status = rectime=1545445141,macaddr=00:0d:3a:1d:dc:fc,cpuclock=Fixed,varattr=,jobs=,state=free,netload=4141601897734,gres=,loadave=0.00,ncpus=8,physmem=57702500kb,availmem=39888524kb,totmem=5
7702500kb,idletime=1641037,nusers=2,nsessions=2,sessions=1173 2230,uname=Linux master-production-20160630-cluster-007.exabyte.io 3.10.0-862.14.4.el7.x86_64 #1 SMP Wed Sep 26 15:12:11 UTC 2018 x86_
64,opsys=linux
     mom_service_port = 15002
     mom_manager_port = 15003
```
