'use strict';

const CONFIG = require('./config.json');


function mtnl(quantity, unit_type='dry') {
    const units = CONFIG.units[unit_type];
    if (!units){
        throw new Error(`Unit type: ${unit_type} not present in config`);
    }

    return `${quantity} ${CONFIG.default_unit}`;
}

module.exports = mtnl;
