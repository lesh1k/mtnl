/* eslint-env mocha */
let chai = require('chai');
let assert = chai.assert;

const CONFIG = require('../config.json');
let mtnl = require('../mtnl');

describe('MTNL', () => {
    it('Is a function', () => {
        assert.isFunction(mtnl);
    });

    it('Returns input quantity with default_unit if no result available', () => {
        let expected = `-1 ${CONFIG.default_unit}`;
        assert.strictEqual(mtnl(-1), expected);
    });
});
