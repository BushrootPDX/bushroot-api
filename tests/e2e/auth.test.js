const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('auth', () => {

    before(db.drop);

    const user = {
        email: 'user',
        password: 'abc'
    };

    describe('user management', () => {

        const badRequest = (url, data, code, error) => 
            request
                .post(url)
                .send(data)
                .then(
                    () => {
                        throw new Error('status should not be okay');
                    },
                    res => {
                        assert.equal(res.status, code);
                        assert.equal(res.response.body.error, error);
                    }
                );
        
        it('signup requires email', () => {
            return badRequest('/api/auth/signup', { password: 'abc' }, 400, 'email and password must be supplied');
        });

        it('signup requires password', () => {
            return badRequest('/api/auth/signup', { email: 'abc' }, 400, 'email and password must be supplied');
        });

        let token = '';

        it('signup', () => {
            return request 
                .post('/api/auth/signup')
                .send(user)
                .then(res => assert.ok(token = res.body.token));
        });

        it('signin', () => {
            return request
                .post('/api/auth/signin')
                .send(user)
                .then(res => assert.ok(res.body.token))
        });
    });
});