var mongoose = require('mongoose');
var router = require('express').Router();
var Hobby = mongoose.model('Hobby');

router.post('/', function(req, res, next){
    var hobby = new Hobby();

    hobby.name = req.body.name;

    hobby.save().then(function(){
        return res.json({hobby: hobby});
    }).catch(next);
});

router.get('/:hobbyId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.hobbyId)) {
        Hobby.findById(req.params.id).then(function (hobby) {
            if (!hobby) {
                return res.sendStatus(404);
            }
            return res.json({hobby: hobby});
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.get('/', function(req, res){
    Hobby.find({}, function (error, hobbies) {
        if(error) {
            return res.sendStatus(400);
        }
        return res.json({hobby: hobbies});
    });
});

router.put('/:hobbyId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.hobbyId)) {
        Hobby.findById(req.params.hobbyId).then(function (hobby) {
            if (!hobby) {
                return res.sendStatus(404);
            }
            // only update fields that were actually passed...
            if (typeof req.body.name !== 'undefined') {
                hobby.name = req.body.name;
            }
            return hobby.save().then(function () {
                return res.json({hobby: hobby});
            });
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.delete('/:hobbyId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.hobbyId)) {
        Hobby.deleteOne({
            _id: req.params.hobbyId
        })
            .then(function (hobby) {
                if (!hobby) {
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