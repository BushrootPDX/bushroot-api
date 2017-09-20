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
    plot: {
        instanceId: requiredString,
        plantId: {
            type: Schema.Types.ObjectId,
            ref: 'Plant', 
            required: true
        },
        xPosition: requiredNumber,
        yPosition: requiredNumber
    }
});

module.exports = mongoose.model('Garden', schema);
