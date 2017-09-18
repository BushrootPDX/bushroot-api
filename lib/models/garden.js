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
    width: requiredNumber,
    height: requiredNumber,
    plot: [{
        type: Schema.Types.ObjectId,
        ref: 'PlantInstance'
    }]
});

module.exports = mongoose.model('Garden', schema);