const mongoose = require('mongoose');
const Company = mongoose.model('Company');

function getByActivityDomains(activityDomains) {
    return new Promise(function (resolve, reject) {
        Company.find({
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