const mongoose = require('mongoose');
const User = mongoose.model('User');

function getByActivityDomains(activityDomains) {
    return new Promise(function (resolve, reject) {
        User.find({
            "activityDomains.name": {$in: activityDomains}
        }).
        sort({ name: -1 }).then(function (result) {
            resolve({"status" : "OK", "content" : result});
        }).catch(function (err) {
            reject({"status": "KO"});
        })
    });
}

module.exports = {
    getByActivityDomains,
};