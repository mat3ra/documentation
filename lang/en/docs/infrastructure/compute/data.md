# Structured Representation of Compute Parameters

Below we show an example JSON structured representation for the compute parameters introduced [here](parameters.md). The keywords contained here are referenced in the ensuing table, where each entry can be clicked upon to retrieve its corresponding documentation explanation.

```json
{
    "ppn" : 1,
    "nodes" : 1,
    "queue" : "D",
    "timeLimit" : "01:00:00",
    "timeLimitType": "per single attempt",
    "isRestartable": true,
    "notify" : "n",
    "cluster" : {
        "fqdn" : "master-production-20160630-cluster-001.exabyte.io",
        "jid" : "31507.master-production-20160630-cluster-001.exabyte.io"
    },
    "arguments" : {
        "npools": 1,    
    }
}
```

## List of Keywords
    
| Keyword                                        |  
|:-----------------------------------------------|
| [ppn](parameters.md#nodes-ppn)               |
| [nodes](parameters.md#nodes-ppn)             |  
| [queue](parameters.md#queue)                   |
| [timeLimit](parameters.md#time-limit)          |  
| [timeLimitType](parameters.md#time-limit-type) |  
| [isRestartable](parameters.md#is-restartable)  |  
| [notify](parameters.md#notifications)          |
| [cluster](parameters.md#cluster-choice)        | 
| [arguments](parameters.md#advanced-options)    |
