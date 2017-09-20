const db = require('./helpers/db');
// const request = ('./helpers/request');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../lib/app');
const request = chai.request(app);
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;


const { assert } = require('chai');
const Garden = require('../../lib/models/garden');


let garden = {
    name: 'East Garden',
    width: 120,
    length: 144,
    plot: []
};

// let plottedGarden = {
//     name: 'East Garden',
//     width: 120,
//     height: 144,
//     plot: [ObjectId('59c02bad8398d8c4b5c3897b')]
// };

let tomatoPlant = {
    name: 'Tomato',
    spread: 8,
    img: 'https://bonnieplants.com/wp-content/uploads/landing-pages/tomatoes/9-ways-to-grow-tomatoes-on-vine-feature.jpg',
    harvestAmnt: 10,
    harvestUnit: 'pounds',
    _id: '59c02bad8398d8c4b5c3897b'
};


before(db.drop);
before(() => db.savePlant(tomatoPlant));

describe('garden', () => {

    it('/GET all', () => request
        .get('/api/gardens')
        .then(res => assert.deepEqual(res.body, []))
    );
    it('/POST', () => request
        .post('/api/gardens')
        .send(garden)
        .then(({ body }) => {
            garden = body;
        })
        .then(() => {
            assert.ok(garden._id);
            assert.equal(garden.name, 'East Garden');
        })
    );

});