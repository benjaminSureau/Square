const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

const NotificationSchema = mongoose.Schema({
    status: Boolean,
    content: String,
    accountId: ObjectId

}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', NotificationSchema);