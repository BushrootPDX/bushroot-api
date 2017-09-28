const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredNumber = {
    type: Number,
    required: true
};

const schema = new Schema({
    plant: {
        type: Schema.Types.ObjectId,
        ref: 'Plant', 
        required: true
    },
    // I don't think these are used, x and y is in garden? Or the other way around?
    x: requiredNumber,
    y: requiredNumber,
    // "img" for the plant?
    img: {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
        required: false
    },
    // don't speculate. Add these fields when you add the feature...
    watered: [{
        type: Date,
        required: false
    }],
    planted: [{
        type: Boolean,
        required: false
    }]

});

module.exports = mongoose.model('PlantInstance', schema);