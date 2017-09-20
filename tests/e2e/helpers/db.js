const connection = require('mongoose').connection;
const request = require('./request');
const Plant = require('../../../lib/models/plant');
const PlantInstance = require('../../../lib/models/plantInstance');


module.exports = {
    drop() {
        return connection.dropDatabase();
    },
    getToken(user = { email: 'test@test.com', password: '123' }) {
        return request.post('api/auth/signup')
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
    },
    savePlant(plant) {
        let newPlant = new Plant(plant);
        return newPlant.save();
    },
    savePlantInstance(plantInstance) {
        let newPlantInstance = new PlantInstance(plantInstance);
        return newPlantInstance.save();
    }
};