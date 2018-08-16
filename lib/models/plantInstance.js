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
    x: requiredNumber,
    y: requiredNumber,
    img: {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
        required: false
    }
});

module.exports = mongoose.model('PlantInstance', schema);