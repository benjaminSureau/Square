const mongoose = require('mongoose');
const User = mongoose.model('User');

function getBySkills(skills) {
    return new Promise(function (resolve, reject) {
        User.find({
            "skills.name": {$in: skills}
        }).
        sort({ firstName: -1 }).then(function (result) {
            resolve({"status" : "OK", "content" : result});
        }).catch(function (err) {
            reject({"status": "KO"});
        })
    });
}

function getByHobbies(hobbies) {
    return new Promise(function (resolve, reject) {
        User.find({
            "hobbies.name": {$in: hobbies}
        }).
        sort({ firstName: -1 }).then(function (result) {
            resolve({"status" : "OK", "content" : result});
        }).catch(function (err) {
            reject({"status": "KO"});
        })
    });
}

function getByQualifications(qualifications) {
    return new Promise(function (resolve, reject) {
        User.find({
            "qualifications.name": {$in: qualifications}
        }).
        sort({ firstName: -1 }).then(function (result) {
            resolve({"status" : "OK", "content" : result});
        }).catch(function (err) {
            reject({"status": "KO"});
        })
    });
}

function getBySkillsHobbies(skills, hobbies) {
    return new Promise(function (resolve, reject) {
        User.find({
            $or: [
                {"skills.name": {$in: skills}},
                {"hobbies.name": {$in: hobbies}}
            ]

        }).
        sort({ firstName: -1 }).then(function (result) {
            resolve({"status" : "OK", "content" : result});
        }).catch(function (err) {
            reject({"status": "KO"});
        })
    });
}

function getBySkillsQualifications(skills, qualifications) {
    return new Promise(function (resolve, reject) {
        User.find({
            $or: [
                {"skills.name": {$in: skills}},
                {"qualifications.name": {$in: qualifications}}
            ]

        }).
        sort({ firstName: -1 }).then(function (result) {
            resolve({"status" : "OK", "content" : result});
        }).catch(function (err) {
            reject({"status": "KO"});
        })
    });
}

function getByHobbiesQualifications(hobbies, qualifications) {
    return new Promise(function (resolve, reject) {
        User.find({
            $or: [
                {"hobbies.name": {$in: hobbies}},
                {"qualifications.name": {$in: qualifications}}
            ]

        }).
        sort({ firstName: -1 }).then(function (result) {
            resolve({"status" : "OK", "content" : result});
        }).catch(function (err) {
            reject({"status": "KO"});
        })
    });
}

function getBySkillsHobbiesQualifications(skills, hobbies, qualifications) {
    return new Promise(function (resolve, reject) {
        User.find({
            $or: [
                {"skills.name": {$in: skills}},
                {"hobbies.name": {$in: hobbies}},
                {"qualifications.name": {$in: qualifications}}
            ]

        }).
        sort({ firstName: -1 }).then(function (result) {
            resolve({"status" : "OK", "content" : result});
        }).catch(function (err) {
            reject({"status": "KO"});
        })
    });
}


module.exports = {
    getBySkills,
    getByHobbies,
    getByQualifications,
    getBySkillsHobbies,
    getBySkillsQualifications,
    getByHobbiesQualifications,
    getBySkillsHobbiesQualifications,
};