const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredNumber = {
    type: Number,
    required: true
};

const schema = new Schema({
    species: {
        type: Schema.Types.ObjectId,
        ref: 'Plant', 
        required: true
    },
    xPosition: requiredNumber,
    yPosition: requiredNumber
});

module.exports = mongoose.model('PlantInstance', schema);