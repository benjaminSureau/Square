var mongoose = require('mongoose');
var router = require('express').Router();
var Skill = mongoose.model('Skill');

router.post('/', function(req, res, next){
    var skill = new Skill();

    skill.name = req.body.name;

    skill.save().then(function(){
        return res.json({skill: skill});
    }).catch(next);
});

router.get('/:skillId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.skillId)) {
        Skill.findById(req.params.id).then(function (skill) {
            if (!skill) {
                return res.sendStatus(404);
            }
            return res.json({skill: skill});
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});


router.get('/', function(req, res){
    Skill.find({}, function (error, skills) {
        if(error) {
            return res.sendStatus(400);
        }
        return res.json({skill: skills});
    });
});

router.put('/:skillId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.skillId)) {
        Skill.findById(req.params.skillId).then(function (skill) {
            if (!skill) {
                return res.sendStatus(404);
            }
            // only update fields that were actually passed...
            if (typeof req.body.name !== 'undefined') {
                skill.name = req.body.name;
            }
            return skill.save().then(function () {
                return res.json({skill: skill});
            });
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.delete('/:skillId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.skillId)) {
        Skill.deleteOne({
            _id: req.params.skillId
        })
            .then(function (skill) {
                if (!skill) {
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