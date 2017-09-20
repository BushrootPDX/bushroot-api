const Garden = require('../../lib/models/garden');
const { assert } = require('chai');

describe('garden model', () => {

    it('validates with reuired fields', () => {
        const garden = new Garden({
            name: 'East Garden',
            width: 120,
            length: 144
        });
        return garden.validate();
    });
});