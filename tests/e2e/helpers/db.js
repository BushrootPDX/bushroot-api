const connection = require('mongoose').connection;
const request = require('./request');


module.exports = {
    drop() {
        return connection.dropDatabase();
    },
    getToken(user = { email: 'test@test.com', password: '123' }) {
        return request.post('/auth/signup')
            .send(user)
            .then(res => res.body.token);
    },
    signup(user) {
        return request.post('/auth/signup')
            .send(user)
            .then(res => res.body);
    },
    signin(user) {
        return request.post('/auth/signin')
            .send(user)
            .then(res => res.body);
    }
};