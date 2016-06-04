/* eslint-env mocha */
let assert = require('chai').assert;

const TEST_CONFIG = require('./tests.config.json');
const mtnl = function(quantity, unit_type='dry', config=TEST_CONFIG) {
    return require('../mtnl').call(null, quantity, unit_type, config);
};


describe('MTNL', () => {
    it('Is a function', () => {
        assert.isFunction(mtnl);
    });

    it('Throws an err if quantity is negative', () => {
        let fn = mtnl.bind(null, -1);
        assert.throws(fn, Error);
    });

    it('Throws an err if unit not in config', () => {
        let fn = mtnl.bind(null, 100, 'THE IMPROBABLE UNIT');
        assert.throws(fn, Error);
    });

    describe('Calculations', () => {
        it('Returns 1 gram(s) for input 1', () => {
            assert.strictEqual(mtnl(1), '1 gram(s)');
        });

        it('Takes into consideration minimum amount of a unit', () => {
            // Should choose "2 cup(s)" over "1/2 liter(s)" because liter has a minimum of 1
            assert.strictEqual(mtnl(500, 'volume'), '2 cup(s)');
        });

        it('Returns the "Rate-unit" if quantity is strictEqual to unit\'s capacity', () => {
            let CONFIG = require('./tests.config.json');
            // Set 0 error tolerance
            CONFIG.error = 0;

            for (let unit_type in CONFIG.units) {
                for (let unit in CONFIG.units[unit_type]) {
                    assert.strictEqual(
                        mtnl(CONFIG.rates[unit], unit_type, CONFIG),
                        `1 ${CONFIG.units[unit_type][unit].name}`,
                        `mtnl(${CONFIG.rates[unit]}, ${unit_type})`
                    );
                }
            }
        });

        it('Simplifies fractions if common factor available (e.g. 2/4 -> 1/2)', () => {
            assert.strictEqual(mtnl(2.5, 'volume'), '1/2 teaspoon(s)');
        });
    });
});
