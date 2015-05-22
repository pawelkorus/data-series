# data-series
JavaScript functions for making calculations on data series
## Quick guide

```javascript
var ds = require('data-series');

// example data
var data = [1, 2, 3];

// create data provider - in this iterator wich goes through all items in array
var it = ds.arrayIterator(data);

// create operator which will calculate sum of elements
var sum = ds.functionOperator(it, ds.math.Sum());

while(sum.hasNext()) {
  console.log(sum.next())
}
```
