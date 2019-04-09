const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Square").then(
    () => {console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database'+ err)}
);
const User = require('../models/User.js');
const Company = require('../models/Company.js');
const Hobby = require('../models/Hobby.js');
const Notification = require('../models/Notification.js');
const Qualification = require('../models/Qualification.js');
const Skill = require('../models/Skill.js');
const Job = require('../models/Job.js');
const ActivityDomain = require('../models/ActivityDomain.js');
mongoose.model('User');
mongoose.model('Company');
mongoose.model('Hobby');
mongoose.model('Notification');
mongoose.model('Qualification');
mongoose.model('Skill');
mongoose.model('Job');
mongoose.model('ActivityDomain');
var assert = require('chai').assert;

describe('Array', function() {
    describe('Users', function() {
        describe('#SaveUser()', function () {
            it('should save user without error', function (done) {
                var user = new User();
                user._id = "5cac7793bc330e3e54025834";
                user.firstName = "John";
                user.lastName = "Smith";
                user.birthDate = new Date("2019-04-08 14:27:00.408");
                user.cityOfResidence = "Lyon";
                user.skills = [{"name": "C++"}, {"name": "Java"}, {"name": "PHP"}];
                user.hobbies = [{"name": "Coding"}, {"name": "Football"}, {"name": "Swimming"}];
                user.qualifications = [{"name": "DUT Informatique"}, {"name": "BAC", "description": "SPE Math"}];

                user.save().then(() => {
                    assert.isNotNull(user);
                    assert.isNotNull(user._id);
                    assert.equal(user.firstName, "John");
                    assert.equal(user.lastName, "Smith");
                    assert.equal(user.cityOfResidence, "Lyon");
                    assert.equal(user.skills[0].name, "C++");
                    assert.equal(user.skills[1].name, "Java");
                    assert.equal(user.skills[2].name, "PHP");
                    assert.equal(user.hobbies[0].name, "Coding");
                    assert.equal(user.hobbies[1].name, "Football");
                    assert.equal(user.hobbies[2].name, "Swimming");
                    assert.equal(user.qualifications[0].name, "DUT Informatique");
                    assert.equal(user.qualifications[1].name, "BAC");
                    assert.equal(user.qualifications[1].description, "SPE Math");
                }).catch(done);
                done();
            });
        });
        describe('#GetUserById()', function () {
            it('should get user using id', function (done) {
                var userId = "5cac7793bc330e3e54025834";
                User.findById(userId).then((user) => {
                    assert.isNotNull(user);
                    assert.isNotNull(user._id);
                    assert.equal(user.cityOfResidence, "Lyon");
                    assert.equal(user.skills[0].name, "C++");
                    assert.equal(user.skills[1].name, "Java");
                    assert.equal(user.skills[2].name, "PHP");
                    assert.equal(user.hobbies[0].name, "Coding");
                    assert.equal(user.hobbies[1].name, "Football");
                    assert.equal(user.hobbies[2].name, "Swimming");
                    assert.equal(user.qualifications[0].name, "DUT Informatique");
                    assert.equal(user.qualifications[1].name, "BAC");
                    assert.equal(user.qualifications[1].description, "SPE Math");
                }).catch(done);
                done();
            });
        });
        describe('#GetUserByUnknownId()', function () {
            it('should get no user using id', function (done) {
                var userId = "5cac58c6ce5672de7063a075";
                User.findById(userId).then((user) => {
                    assert.isNull(user);
                }).catch(done);
                done();
            });
        });
        describe('#GetAllUsers()', function () {
            it('should get all users', function (done) {
                User.find().then((users) => {
                    assert.isNotNull(users);
                    users.forEach(function(user){
                        assert.isNotNull(user);
                        assert.isNotNull(user.firstName);
                        assert.isNotNull(user.lastName);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#UpdateUser()', function () {
            it('should update one user', function (done) {
                var userId = "5cac7793bc330e3e54025834";
                User.findById(userId).then((user) => {
                    user.firstName = "Toto";
                    user.lastName = "Titi";
                    user.save().then(() => {
                        User.findById(userId).then((user) => {
                            assert.isNotNull(user);
                            assert.equal(user.firstName, "Toto");
                            assert.equal(user.lastName, "Titi");
                        }).catch(done);
                    });
                });
                done();
            });
        });
        describe('#DeleteUser()', function () {
            it('should delete one user', function (done) {
                var userId = "5cac7793bc330e3e54025834";
                User.deleteOne({_id: userId}).then( () => {
                    User.findById(userId).then((user) => {
                        assert.isNull(user);
                    }).catch(done);
                }).catch(done);
                done();
            });
        });
    });

    describe('Companies', function() {
        describe('#SaveCompany()', function () {
            it('should save company without error', function (done) {
                var comp = new Company();
                comp._id = "5cac58c6ce513204c063a075";
                comp.name = "Epitech";
                comp.siret = "41761777600154";
                comp.siren = "417617776";
                comp.description = "Ecole d'informatique";

                comp.save().then(() => {
                    assert.isNotNull(comp);
                    assert.isNotNull(comp._id);
                    assert.equal(comp.name, "Epitech");
                    assert.equal(comp.siret, "41761777600154");
                    assert.equal(comp.siren, "417617776");
                    assert.equal(comp.description, "Ecole d'informatique");
                }).catch(done);
                done();
            });
        });
        describe('#GetCompById()', function () {
            it('should get company using id', function (done) {
                var compId = "5cac58c6ce513204c063a075";
                Company.findById(compId).then((comp) => {
                    assert.isNotNull(comp);
                    assert.isNotNull(comp._id);
                    assert.equal(comp.name, "Epitech");
                    assert.equal(comp.siret, "41761777600154");
                    assert.equal(comp.siren, "417617776");
                    assert.equal(comp.description, "Ecole d'informatique");
                }).catch(done);
                done();
            });
        });
        describe('#GetCompByUnknownId()', function () {
            it('should get no comp using id', function (done) {
                var compId = "5cac58c6ce56dfde6163a075";
                Company.findById(compId).then((comp) => {
                    assert.isNull(comp);
                }).catch(done);
                done();
            });
        });
        describe('#GetAllCompanies()', function () {
            it('should get all companies', function (done) {
                Company.find().then((comps) => {
                    assert.isNotNull(comps);
                    comps.forEach(function(comp){
                        assert.isNotNull(comp);
                        assert.isNotNull(comp.name);
                        assert.isNotNull(comp.siret);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#UpdateCompany()', function () {
            it('should update one company', function (done) {
                var compId = "5cac58c6ce513204c063a075";
                Company.findById(compId).then((comp) => {
                    comp.name = "Toto";
                    comp.description = "IT school";
                    comp.save().then( () => {
                        Company.findById(compId).then((comp) => {
                            assert.isNotNull(comp);
                            assert.equal(comp.name, "Toto");
                            assert.equal(comp.description, "IT school");
                        }).catch(done);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#DeleteCompany()', function () {
            it('should delete one company', function (done) {
                var compId = "5cac58c6ce513204c063a075";
                Company.deleteOne({_id: compId}).then( () => {
                    Company.findById(compId).then((comp) => {
                        assert.isNull(comp);
                        done();
                    }).catch(done);
                }).catch(done);
                done();
            });
        });
    });

    describe('Hobbies', function() {
        describe('#SaveHobby()', function () {
            it('should save hobby without error', function (done) {
                var hobby = new Hobby();
                hobby._id = "3cac58c6ce51ac44c063a072";
                hobby.name = "Football";

                hobby.save().then(() => {
                    assert.isNotNull(hobby);
                    assert.isNotNull(hobby._id);
                    assert.equal(hobby.name, "Football");
                }).catch(done);
                done();
            });
        });
        describe('#GetHobbyById()', function () {
            it('should get hobby using id', function (done) {
                var hobbyId = "3cac58c6ce51ac44c063a072";
                Hobby.findById(hobbyId).then((hobby) => {
                    assert.isNotNull(hobby);
                    assert.isNotNull(hobby._id);
                    assert.equal(hobby.name, "Football");
                }).catch(done);
                done();
            });
        });
        describe('#GetHobbyByUnknownId()', function () {
            it('should get no hobby using id', function (done) {
                var hobbyId = "5cac58c6ce56dfde6163a075";
                Hobby.findById(hobbyId).then((hobby) => {
                    assert.isNull(hobby);
                }).catch(done);
                done();
            });
        });
        describe('#GetAllHobbies()', function () {
            it('should get all hobbies', function (done) {
                Hobby.find().then((hobbies) => {
                    assert.isNotNull(hobbies);
                    hobbies.forEach(function(hobby){
                        assert.isNotNull(hobby);
                        assert.isNotNull(hobby.name);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#UpdateHobby()', function () {
            it('should update one hobby', function (done) {
                var hobbyId = "3cac58c6ce51ac44c063a072";
                Hobby.findById(hobbyId).then((hobby) => {
                    hobby.name = "Toto";
                    hobby.save().then( () => {
                        Hobby.findById(hobbyId).then((hobby) => {
                            assert.isNotNull(hobby);
                            assert.equal(hobby.name, "Toto");
                        }).catch(done);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#DeleteHobby()', function () {
            it('should delete one hobby', function (done) {
                var hobbyId = "3cac58c6ce51ac44c063a072";
                Hobby.deleteOne({_id: hobbyId}).then( () => {
                    Hobby.findById(hobbyId).then((hobby) => {
                        assert.isNull(hobby);
                        done();
                    }).catch(done);
                }).catch(done);
                done();
            });
        });
    });

    describe('Notifications', function() {
        describe('#SaveNotification()', function () {
            it('should save notification without error', function (done) {
                var notif = new Notification();
                notif._id = "2bcc58c6ce51ac44c065a068";
                notif.status = true;
                notif.content = "Football";
                notif.accountId = "5cac7793bc330e3e54025834";

                notif.save().then(() => {
                    assert.isNotNull(notif);
                    assert.isNotNull(notif._id);
                    assert.equal(notif.status, true);
                    assert.equal(notif.content, "Football");
                    assert.equal(notif.accountId, "5cac7793bc330e3e54025834");
                }).catch(done);
                done();
            });
        });
        describe('#GetNotificationById()', function () {
            it('should get notification using id', function (done) {
                var notifId = "2bcc58c6ce51ac44c065a068";
                Notification.findById(notifId).then((notif) => {
                    assert.isNotNull(notif);
                    assert.isNotNull(notif._id);
                    assert.equal(notif.status, true);
                    assert.equal(notif.content, "Football");
                    assert.equal(notif.content, "5cac7793bc330e3e54025834");
                }).catch(done);
                done();
            });
        });
        describe('#GetNotificationByUnknownId()', function () {
            it('should get no notification using id', function (done) {
                var notifId = "2bcc58c6ce51ac44c065a068";
                Notification.findById(notifId).then((notif) => {
                    assert.isNull(notif);
                }).catch(done);
                done();
            });
        });
        describe('#GetAllNotifications()', function () {
            it('should get all notifications', function (done) {
                Notification.find().then((notifications) => {
                    assert.isNotNull(notifications);
                    notifications.forEach(function(notif){
                        assert.isNotNull(notif);
                        assert.isNotNull(notif.status);
                        assert.isNotNull(notif.content);
                        assert.isNotNull(notif.accountId);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#UpdateNotification()', function () {
            it('should update one notification', function (done) {
                var notifId = "3cac58c6ce51ac44c063a072";
                Notification.findById(notifId).then((notif) => {
                    notif.content = "Toto";
                    notif.save().then( () => {
                        Notification.findById(notifId).then((notif) => {
                            assert.isNotNull(notif);
                            assert.equal(notif.content, "Toto");
                        }).catch(done);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#DeleteNotification()', function () {
            it('should delete one notif', function (done) {
                var notifId = "2bcc58c6ce51ac44c065a068";
                Notification.deleteOne({_id: notifId}).then( () => {
                    Notification.findById(notifId).then((notif) => {
                        assert.isNull(notif);
                        done();
                    }).catch(done);
                }).catch(done);
                done();
            });
        });
    });

    describe('Qualifications', function() {
        describe('#SaveQualification()', function () {
            it('should save qualification without error', function (done) {
                var qualif = new Qualification();
                qualif._id = "1bcc58c6ce51ac44c065a065";
                qualif.name = "Symfony";
                qualif.description = "PHP, HTML and CSS with symfony";

                qualif.save().then(() => {
                    assert.isNotNull(qualif);
                    assert.isNotNull(qualif._id);
                    assert.equal(qualif.name, "Symfony");
                    assert.equal(qualif.description, "PHP, HTML and CSS with symfony");
                }).catch(done);
                done();
            });
        });
        describe('#GetQualificationById()', function () {
            it('should get qualification using id', function (done) {
                var qualifId = "1bcc58c6ce51ac44c065a065";
                Qualification.findById(qualifId).then((qualif) => {
                    assert.isNotNull(qualif);
                    assert.isNotNull(qualif._id);
                    assert.equal(qualif.name, "Symfony");
                    assert.equal(qualif.description, "PHP, HTML and CSS with symfony");
                }).catch(done);
                done();
            });
        });
        describe('#GetQualificationByUnknownId()', function () {
            it('should get no qualification using id', function (done) {
                var qualifId = "3bcc58c6ce51ac44c065a064";
                Qualification.findById(qualifId).then((qualif) => {
                    assert.isNull(qualif);
                }).catch(done);
                done();
            });
        });
        describe('#GetAllQualifications()', function () {
            it('should get all qualifications', function (done) {
                Qualification.find().then((qualifications) => {
                    assert.isNotNull(qualifications);
                    qualifications.forEach(function(qualif){
                        assert.isNotNull(qualif);
                        assert.isNotNull(qualif.name);
                        assert.isNotNull(qualif.description);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#UpdateQualification()', function () {
            it('should update one qualification', function (done) {
                var qualifId = "1bcc58c6ce51ac44c065a065";
                Qualification.findById(qualifId).then((qualif) => {
                    qualif.name = "Toto";
                    qualif.description = "Titi";
                    qualif.save().then( () => {
                        Qualification.findById(qualifId).then((qualif) => {
                            assert.isNotNull(qualif);
                            assert.equal(qualif.name, "Toto");
                            assert.equal(qualif.description, "Titi");
                        }).catch(done);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#DeleteQualification()', function () {
            it('should delete one qualif', function (done) {
                var qualifId = "1bcc58c6ce51ac44c065a065";
                Qualification.deleteOne({_id: qualifId}).then( () => {
                    Qualification.findById(qualifId).then((qualif) => {
                        assert.isNull(qualif);
                        done();
                    }).catch(done);
                }).catch(done);
                done();
            });
        });
    });

    describe('Skills', function() {
        describe('#SaveSkill()', function () {
            it('should save skill without error', function (done) {
                var skill = new Skill();
                skill._id = "4dac7793bc330e3e54025841";
                skill.name = "Coding";

                skill.save().then(() => {
                    assert.isNotNull(skill);
                    assert.isNotNull(skill._id);
                    assert.equal(skill.name, "Coding");
                }).catch(done);
                done();
            });
        });
        describe('#GetSkillById()', function () {
            it('should get skill using id', function (done) {
                var skillId = "4dac7793bc330e3e54025841";
                Skill.findById(skillId).then((skill) => {
                    assert.isNotNull(skill);
                    assert.isNotNull(skill._id);
                    assert.equal(skill.name, "Coding");
                }).catch(done);
                done();
            });
        });
        describe('#GetSkillByUnknownId()', function () {
            it('should get no user using id', function (done) {
                var skillId = "5cac58c6ce5672de7063a075";
                Skill.findById(skillId).then((skill) => {
                    assert.isNull(skill);
                }).catch(done);
                done();
            });
        });
        describe('#GetAllSkills()', function () {
            it('should get all skills', function (done) {
                Skill.find().then((skills) => {
                    assert.isNotNull(skills);
                    skills.forEach(function(skill){
                        assert.isNotNull(skill);
                        assert.isNotNull(skill.name);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#UpdateSkill()', function () {
            it('should update one user', function (done) {
                var skillId = "4dac7793bc330e3e54025841";
                Skill.findById(skillId).then((skill) => {
                    skill.name = "Toto";
                    skill.save().then(() => {
                        Skill.findById(skillId).then((skill) => {
                            assert.isNotNull(skill);
                            assert.equal(skill.name, "Toto");
                        }).catch(done);
                    });
                });
                done();
            });
        });
        describe('#DeleteSkill()', function () {
            it('should delete one skill', function (done) {
                var skillId = "4dac7793bc330e3e54025841";
                Skill.deleteOne({_id: skillId}).then( () => {
                    Skill.findById(skillId).then((skill) => {
                        assert.isNull(skill);
                    }).catch(done);
                }).catch(done);
                done();
            });
        });
    });

    describe('Jobs', function() {
        describe('#SaveJob()', function () {
            it('should save job without error', function (done) {
                var job = new Job();
                job._id = "7fac7793bc330e3e54025847";
                job.name = "WebDevelopper";
                job.description = "Use symfony to develop web apps";
                job.grossWage = "30k";

                job.save().then(() => {
                    assert.isNotNull(job);
                    assert.isNotNull(job._id);
                    assert.equal(job.name, "WebDevelopper");
                    assert.equal(job.description, "Use symfony to develop web apps");
                    assert.equal(job.grossWage, "30k");
                }).catch(done);
                done();
            });
        });
        describe('#GetJobById()', function () {
            it('should get job using id', function (done) {
                var jobId = "7fac7793bc330e3e54025847";
                Job.findById(jobId).then((job) => {
                    assert.isNotNull(job);
                    assert.isNotNull(job._id);
                    assert.equal(job.name, "WebDevelopper");
                    assert.equal(job.description, "Use symfony to develop web apps");
                    assert.equal(job.grossWage, "30k");
                }).catch(done);
                done();
            });
        });
        describe('#GetJobByUnknownId()', function () {
            it('should get no user using id', function (done) {
                var jobId = "5cac58c6ce5672de7063a075";
                Job.findById(jobId).then((job) => {
                    assert.isNull(job);
                }).catch(done);
                done();
            });
        });
        describe('#GetAllJobs()', function () {
            it('should get all jobs', function (done) {
                Job.find().then((jobs) => {
                    assert.isNotNull(jobs);
                    jobs.forEach(function(job){
                        assert.isNotNull(job);
                        assert.isNotNull(job.name);
                        assert.isNotNull(job.description);
                        assert.isNotNull(job.grossWage);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#UpdateJob()', function () {
            it('should update one job', function (done) {
                var jobId = "7fac7793bc330e3e54025847";
                Job.findById(jobId).then((job) => {
                    job.name = "Toto";
                    job.description = "Using nodejs / vuejs / react";
                    job.grossWage = "32k";
                    job.save().then(() => {
                        Job.findById(jobId).then((job) => {
                            assert.isNotNull(job);
                            assert.equal(job.name, "Web Development");
                            assert.equal(job.description, "Using nodejs / vuejs / react");
                            assert.equal(job.grossWage, "32k");
                        }).catch(done);
                    });
                });
                done();
            });
        });
        describe('#DeleteJob()', function () {
            it('should delete one job', function (done) {
                var jobId = "7fac7793bc330e3e54025847";
                Job.deleteOne({_id: jobId}).then( () => {
                    Job.findById(jobId).then((job) => {
                        assert.isNull(job);
                    }).catch(done);
                }).catch(done);
                done();
            });
        });
    });

    describe('ActivityDomains', function() {
        describe('#SaveActivityDomain()', function () {
            it('should save ActivityDomain without error', function (done) {
                var activity = new ActivityDomain();
                activity._id = "9eac7793bc330e3e54025849";
                activity.name = "Web development";

                activity.save().then(() => {
                    assert.isNotNull(activity);
                    assert.isNotNull(activity._id);
                    assert.equal(activity.name, "Web development");
                }).catch(done);
                done();
            });
        });
        describe('#GetActivityDomainById()', function () {
            it('should get ActivityDomain using id', function (done) {
                var activityId = "9eac7793bc330e3e54025849";
                ActivityDomain.findById(activityId).then((activity) => {
                    assert.isNotNull(activity);
                    assert.isNotNull(activity._id);
                    assert.equal(activity.name, "Web development");
                }).catch(done);
                done();
            });
        });
        describe('#GetActivityDomainByUnknownId()', function () {
            it('should get no user ActivityDomain id', function (done) {
                var activityId = "5cac58c6ce5672de7063a075";
                ActivityDomain.findById(activityId).then((activity) => {
                    assert.isNull(activity);
                }).catch(done);
                done();
            });
        });
        describe('#GetAllActivityDomains()', function () {
            it('should get all ActivityDomains', function (done) {
                ActivityDomain.find().then((activities) => {
                    assert.isNotNull(activities);
                    activities.forEach(function(activity){
                        assert.isNotNull(activity);
                        assert.isNotNull(activity.name);
                    });
                }).catch(done);
                done();
            });
        });
        describe('#UpdateActivityDomain()', function () {
            it('should update one ActivityDomain', function (done) {
                var activityId = "9eac7793bc330e3e54025849";
                ActivityDomain.findById(activityId).then((activity) => {
                    activity.name = "Toto";
                    activity.save().then(() => {
                        ActivityDomain.findById(activityId).then((activity) => {
                            assert.isNotNull(activity);
                            assert.equal(activity.name, "Web Development");
                        }).catch(done);
                    });
                });
                done();
            });
        });
        describe('#DeleteActivityDomain()', function () {
            it('should delete one ActivityDomain', function (done) {
                var activityId = "9eac7793bc330e3e54025849";
                ActivityDomain.deleteOne({_id: activityId}).then( () => {
                    ActivityDomain.findById(activityId).then((activity) => {
                        assert.isNull(activity);
                    }).catch(done);
                }).catch(done);
                done();
            });
        });
    });
});