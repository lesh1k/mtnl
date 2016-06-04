/* eslint-env mocha */
let chai = require('chai');
let assert = chai.assert;

let mtnl = require('../mtnl');

describe('MTNL', () => {
    it('Is a function', () => {
        assert.isFunction(mtnl);
    });
});
