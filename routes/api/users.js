const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');

router.post('/', function(req, res, next){
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.birthDate = req.body.birthDate;
    user.cityOfResidence = req.body.cityOfResidence;

    if (Array.isArray(req.body.skills)) {
        user.skills = req.body.skills;
    }

    if (Array.isArray(req.body.hobbies)) {
        user.hobbies = req.body.hobbies;
    }

    if (Array.isArray(req.body.qualifications)) {
        user.qualifications = req.body.qualifications;
    }

    user.save().then(function(){
        return res.status(201).send({user: user});
    }).catch(next);
});

router.get('/', function(req, res, next){
    User.find({}, function (err, users) {
        return res.send(users);
    }).catch(next);

});

router.get('/:userId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
        User.findById(req.params.userId).then(function (user) {
            if (!user) {
                return res.sendStatus(404);
            }
            return res.json({user: user});
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.put('/:userId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
        User.findById(req.params.userId).then(function (user) {
            if (!user) {
                return res.sendStatus(404);
            }

            // only update fields that were actually passed...
            if (typeof req.body.firstName !== 'undefined') {
                user.firstName = req.body.firstName;
            }
            if (typeof req.body.lastName !== 'undefined') {
                user.lastName = req.body.lastName;
            }
            if (typeof req.body.birthDate !== 'undefined') {
                user.birthDate = new Date(req.body.birthDate);
            }
            if (typeof req.body.cityOfResidence !== 'undefined') {
                user.cityOfResidence = req.body.cityOfResidence;
            }

            if (Array.isArray(req.body.skills)) {
                user.skills = req.body.skills;
            }

            if (Array.isArray(req.body.hobbies)) {
                user.hobbies = req.body.hobbies;
            }

            if (Array.isArray(req.body.qualifications)) {
                user.qualifications = req.body.qualifications;
            }
            
            return user.save().then(function () {
                return res.json({user: user});
            });
        }).catch(next);
    }else {
        return res.sendStatus(400);
    }
});

router.delete('/:userId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
        User.deleteOne({
            _id: req.params.userId
        })
            .then(function (user) {
                if (!user) {
                    return res.sendStatus(404);
                }
                return res.sendStatus(200);
            })
            .catch(next);
    } else {
        return res.sendStatus(400);
    }
});

module.exports = router;