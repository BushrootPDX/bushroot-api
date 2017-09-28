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
    // Why not harvestAmount? was the store out of o's and u's? ;)
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