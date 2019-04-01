const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    birthDate: Date,
    cityOfResidence: String

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);