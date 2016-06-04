const CONFIG = require('./config.json');


function mtnl(quantity, type='dry') {
    return `${quantity} ${CONFIG.default_unit}`;
}

module.exports = mtnl;
