const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

const JobSchema = mongoose.Schema({
    name: String,
    description: String,
    grossWage: String,
    companyId: ObjectId

}, {
    timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);