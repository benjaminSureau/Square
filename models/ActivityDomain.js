const mongoose = require('mongoose');

const ActivityDomainSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('ActivityDomain', ActivityDomainSchema);