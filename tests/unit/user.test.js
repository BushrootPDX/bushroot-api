const User = require('../../lib/models/user');
const { assert } = require('chai');

describe('user model', () => {

    it('validates with required fields', () => {
        const reggie = new User({
            name: 'reggie',
            email: 'reggie@plants.plants',
            hash: 'asdf'
        });
        reggie.validate();
    });

    it('new user generates hash', () => {
        const user = new User({
            email: 'bob@bob.bob'
        });

        const password = 'asdf';

        user.generateHash(password);

        assert.notEqual(user.hash, password);
        assert.isOk(user.comparePassword('asdf'));
        assert.isNotOk(user.comparePassword('badpassword'));
    });

});
