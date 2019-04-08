const mongoose = require('mongoose');
const skillSchema = require('./Skill.js').schema;
const hobbySchema = require('./Hobby.js').schema;

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    birthDate: Date,
    cityOfResidence: String,
    skills: [skillSchema],
    hobbies: [hobbySchema]

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);