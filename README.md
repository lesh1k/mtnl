### Quantity to "kitchen" language  

JS module that provides a function to convert an amount in grams (or other units) to more "kitchen-like" language  
"mtnl" stands for measurement to natural language


#### Examples  
```javascript
var mtnl = require('./mtnl');
mtnl(300); // '11 ounce(s)'
mtnl(500); // '2 cup(s)'
mtnl(3520); // '15 1/2 cup(s)'
mtnl(3520, 'volume'); // '1 gallon(s)'
mtnl(5, 'weight'); // '1 teaspoon(s)'
mtnl(7); // 1 1/2 teaspoon(s)
mtnl(6); // 1 1/4 teaspoon(s)
```  

All units, unit types, quantities and margin of error can be specified in [config.json](./config.json)
