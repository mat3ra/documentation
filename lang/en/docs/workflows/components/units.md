# Subworkflow Units

[Subworkflows](subworkflows.md) are composed of one or multiple **units**, or elementary calculations that can be executed in succession based on algorithmic conditions.

## Unit types

The following types of units are available.

### Execution

Used for computationally-heavy tasks, e.g. for a singular run of a physics-based simulation engine. For physics-based [modeling engines]({{ reference_url }}/software/components/), the execution unit is the main one. It contains the information about the input parameters and runtime environment for the specific simulation engine.

### Processing

Used for data processing tasks that are not computationally intensive in nature, eg. data cleaning.

### I/O

Perform input/output operations, such as reading from a remote database or downloading from object storage.

### Assignment

Declare, set, increment, and perform math operations on variables. For example: iterate over a counter variable and a k-point density variable for a k-point convergence workflow.

The following functions/types/libraries are available:

- built-in functions/types listed at [https://docs.python.org/3.8/library/functions.html](https://docs.python.org/3.8/library/functions.html) excluding the functions starting with `_` and unsafe functions (`compile`, `eval`, `exec`, `getattr`, `isinstance`, `open`, `repr`, `setattr`);
- `json` - standard JSON library;
- `math` - standard math library;
- `np` - NumPy library;
- `random` - standard library of random variable generators.

#### Examples

Here's the JSON representation of an assignment unit using functional evaluation. Note the "value" key and the use of the `abs` function from numpy via `np.abs`:

```json
{
    "head": true,
    "flowchartId": "assignment",
    "name": "assignment",
    "type": "assignment",
    "input": [
        {
            "scope": "global",
            "name": "x"
        }
    ],
    "operand": "x",
    "value": "2 * np.abs(x - 10)"
}
```

Similarly, we can use other functions, such as `math`, `round`, `int`, `json`, as shown below

```json
{
    ...
    "value": "x + float(2) - int(2.5) + round(pow(math.pi, abs(-2))) / len(range(2))"
}
```

```json
{
    ...
    "value": "x - json.loads(str(5)) + np.int64(random.random())"
}
```

### Conditional

Used to make a decision on what should be the next unit in the workflow to be executed. The conditional is a mathematical formula that operates on one or more assignment variables to choose the next unit.

### Map/Reduce

A step that is replicated for a list of independent input parameters. For example: run a total energy calculation subworkflow using a list of materials such as "Li, Na, K, Rb, Cs, Fr" as inputs.
