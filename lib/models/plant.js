const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    spread: requiredNumber,
    img: requiredString,
    harvestAmnt: {
        type: Number,
        required: false
    },
    harvestUnit: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Plant', schema);