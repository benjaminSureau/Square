const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: String,
    siret: String,
    siren: String,
    description: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);