'use strict';

const LOADED_CONFIG = require('./config.json');


function mtnl(quantity, unit_type='dry', CONFIG=LOADED_CONFIG) {
    const rates = CONFIG.rates;
    const error = CONFIG.error / 100;
    const units = CONFIG.units[unit_type];

    if (!units){
        throw new Error(`Unit type: ${unit_type} not present in config.units`);
    }

    if (quantity < 0) {
        throw new Error('Quantity should be a non-negative number');
    }

    let matching_units = findMatchingWithinError(quantity, units, rates, error);
    if (matching_units.length) {
        let unit = findBiggestMatching(matching_units, rates);
        let amount = getAmount(quantity, rates[unit], units[unit]);
        return formatResult(amount, units[unit]);
    }

    return `${quantity} ${CONFIG.default_unit}`;
}

function findMatchingWithinError(quantity=0, units={}, rates={}, allowed_error=0) {
    let result = [];
    for (let k in rates) {
        if (!(k in units)) {
            continue;
        }

        let amount = getAmount(quantity, rates[k], units[k]),
            actual_error = Math.abs(quantity - amount * rates[k]) / quantity;
        if (amount >= units[k].minimum && actual_error <= allowed_error) {
            result.push(k);
        }
    }
    return result;
}

function findBiggestMatching(matching, rates) {
    let result = matching[0],
        max = rates[matching[0]];

    for (let k of matching) {
        if (rates[k] > max) {
            result = k;
            max = rates[k];
        }
    }

    return result;
}

function getAmount(q, rate, unit) {
    return Math.round(q / rate / unit.divisible) * unit.divisible;
}

function formatResult(amount, unit) {
    let full = parseInt(amount),
        partial = parseInt((amount - full) / unit.divisible),
        res = '';

    if (full) {
        res += `${full} `;
    }

    if (partial) {
        let numerator = partial,
            denominator = parseInt(1/unit.divisible),
            common_factor = denominator / numerator;

        if (common_factor % 1 === 0 && numerator / common_factor % 1 === 0) {
            numerator = numerator / common_factor;
            denominator = denominator / common_factor;
        }

        res += `${numerator}/${denominator} `;
    }

    res += `${unit.name}`;
    return res;
}

module.exports = mtnl;
