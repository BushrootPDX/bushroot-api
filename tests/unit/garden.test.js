const Garden = require('../../lib/models/garden');
const { assert } = require('chai');

describe('garden model', () => {
    // doesn't really tell you much about validation happening,
    // other than it works these three fields. value is in failure
    // when fields are NOT present
    it('validates with reuired fields', () => {
        const garden = new Garden({
            name: 'East Garden',
            width: 120,
            length: 144
        });
        return garden.validate();
    });
});