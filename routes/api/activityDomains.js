const mongoose = require('mongoose');
const router = require('express').Router();
const ActivityDomain = mongoose.model('ActivityDomain');

router.post('/', function(req, res, next){
    let activityDomain = new ActivityDomain();
    activityDomain.name = req.body.name;

    activityDomain.save().then(function(){
        return res.status(201).send({activityDomain: activityDomain});
    }).catch(next);
});

router.get('/', function(req, res, next){
    ActivityDomain.find({}, function (err, activityDomains) {
        return res.send(activityDomains);
    }).catch(next);

});

router.get('/:activityDomainId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.activityDomainId)) {
        ActivityDomain.findById(req.params.activityDomainId).then(function (activityDomain) {
            if (!activityDomain) {
                return res.sendStatus(404);
            }
            return res.json({activityDomain: activityDomain});
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.put('/:activityDomainId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.activityDomainId)) {
        ActivityDomain.findById(req.params.activityDomainId).then(function (activityDomain) {
            if (!activityDomain) {
                return res.sendStatus(404);
            }

            // only update fields that were actually passed...
            if (typeof req.body.name !== 'undefined') {
                activityDomain.name = req.body.name;
            }

            return activityDomain.save().then(function () {
                return res.json({activityDomain: activityDomain});
            });
        }).catch(next);
    }else {
        return res.sendStatus(400);
    }
});

router.delete('/:activityDomainId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.activityDomainId)) {
        ActivityDomain.deleteOne({
            _id: req.params.activityDomainId
        })
            .then(function (activityDomain) {
                if (!activityDomain) {
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