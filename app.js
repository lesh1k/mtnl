const mtnl = require('./mtnl');


let params = [
    [500],
    [3, 'volume']
];

for (let p of params) {
    console.log(p, mtnl.apply(null, p));
}
