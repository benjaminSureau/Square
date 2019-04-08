const mongoose = require('mongoose');

const HobbySchema = mongoose.Schema({
    name: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Hobby', HobbySchema);