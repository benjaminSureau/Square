const mongoose = require('mongoose');
const activiDomainSchema = require('./ActivityDomain.js').schema;

const CompanySchema = mongoose.Schema({
    name: String,
    siret: String,
    siren: String,
    description: String,
    activityDomains: [activiDomainSchema]

}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);