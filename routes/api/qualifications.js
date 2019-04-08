var mongoose = require('mongoose');
var router = require('express').Router();
var Qualification = mongoose.model('Qualification');

router.post('/', function(req, res, next){
    var qualification = new Qualification();

    qualification.name = req.body.name;
    qualification.description = req.body.description;

    qualification.save().then(function(){
        return res.json({qualification: qualification});
    }).catch(next);
});

router.get('/:qualificationId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.qualificationId)) {
        Qualification.findById(req.params.id).then(function (qualification) {
            if (!qualification) {
                return res.sendStatus(404);
            }
            return res.json({qualification: qualification});
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.get('/', function(req, res){
    Qualification.find({}, function (error, qualifications) {
        if(error) {
            return res.sendStatus(400);
        }
        return res.json({qualification: qualifications});
    });
});

router.put('/:qualificationId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.qualificationId)) {
        Qualification.findById(req.params.qualificationId).then(function (qualification) {
            if (!qualification) {
                return res.sendStatus(404);
            }
            // only update fields that were actually passed...
            if (typeof req.body.name !== 'undefined') {
                qualification.name = req.body.name;
            }
            if (typeof req.body.description !== 'undefined') {
                qualification.description = req.body.description;
            }
            return qualification.save().then(function () {
                return res.json({qualification: qualification});
            });
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.delete('/:qualificationId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.qualificationId)) {
        Qualification.deleteOne({
            _id: req.params.qualificationId
        })
            .then(function (qualification) {
                if (!qualification) {
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