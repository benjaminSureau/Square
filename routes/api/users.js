var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');

router.post('/', function(req, res, next){
    var user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.birthDate = req.body.birthDate;
    user.cityOfResidence = req.body.cityOfResidence;

    user.save().then(function(){
        return res.json({user: user});
    }).catch(next);
});

router.get('/:userId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
        User.findById(req.params.id).then(function (user) {
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