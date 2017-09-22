const db = require('./helpers/db');
const request = db.request;
const { assert } = require('chai');

let garden = {
    name: 'East Garden',
    width: 120,
    length: 144,
    plot: []
};

describe('garden', () => {
    before(db.drop);
    let token = null;
    before(() => db.getToken().then(t => token = t));
    
    it('/POST', () => {
        return request
            .post('/api/gardens')
            .set('Authorization', token)   
            .send(garden)     
            .then(({ body }) => {
                garden = body.savedGarden;
            })
            .then(() => {
                assert.ok(garden._id);
                assert.equal(garden.name, 'East Garden');
            });
    });

});