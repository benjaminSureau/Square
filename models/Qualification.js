const mongoose = require('mongoose');

const QualificationSchema = mongoose.Schema({
    name: String,
    description : String

}, {
    timestamps: true
});

module.exports = mongoose.model('Qualification', QualificationSchema);