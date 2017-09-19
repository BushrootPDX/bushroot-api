const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlantInstance = require('./plantInstance.js');

const requiredString = {
    type: String,
    required: true
};

const requiredNumber = {
    type: Number,
    required: true
};

const schema = new Schema({
    name: requiredString,
    width: requiredNumber,
    height: requiredNumber,
    plot: [{
        type: Schema.Types.ObjectId,
        ref: 'PlantInstance'
    }]
});

schema.static('createPlantInstance', function(plantInstance) {
    let newPlantInstance = new PlantInstance(plantInstance);
    return newPlantInstance.save();
            
});

module.exports = mongoose.model('Garden', schema);
