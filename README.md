### Quantity to "more natural" language  

JS module that provides a function to convert an amount in grams (or other units) to a more "kitchen-like" language  
`mtnl` stands for *measurement to natural language*  


####Usage  
```javascript
// Load module. It exports one function - mtnl
var mtnl = require('./mtnl');

// Call the function
mtnl(3520); // '15 1/2 cup(s)'

// Optionally specify unit type
mtnl(3520, 'volume'); // '1 gallon(s)'
// OR a totaly different config
const OTHER_CONFIG = require('./other_config.json');
mtnl(1000, 'dry', OTHER_CONFIG);
```  

All units, unit types, quantities and margin of error can be specified in [config.json](./config.json)  
The code was written for units used in kitchen, however, using the above-mentioned config it can be adopted for any use.  

In config, a unit looks like this:  
```json
{
  "cup": {
      "name": "cup(s)",
      "minimum": 1,
      "divisible": 0.5
  }
}
```  

- `name` is used for output (e.g. `'1/2 cup(s)'`)  
- `minimum` is used for specifying the smallest amount possible. For cup it's 1, thus `1/2 cup(s)` will never be possible, while `1 1/2 cup(s)` will be possible.  
- `divisible` is used to determine the smallest *part* of the unit. For cup it's 0.5, thus `1 1/2 cup(s)` will be possible, while `1 3/4 cup(s)` will be not.  

The `mntl` function chooses the biggest unit possible (based on `rates` in config) that allows getting the quantity within the specified margin of error (e.g. 6 grams with 10% error can be either `6 gram(s)` OR `1 1/4 teaspoons`. The output will be the latter since, `teaspoon` is bigger than `gram`.  


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
