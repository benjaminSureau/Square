const mongoose = require('mongoose');
const router = require('express').Router();
const Job = mongoose.model('Job');
const Company = mongoose.model('Company');

router.post('/', function(req, res, next){
    let job = new Job();

    job.name = req.body.name;
    job.description = req.body.description;
    job.grossWage = req.body.grossWage;

    if (typeof req.body.companyId !== 'undefined' &&
        mongoose.Types.ObjectId.isValid(req.body.companyId))  {
        Company.findById(req.body.companyId).then(function (result) {
            if (!result) {
                return res.sendStatus(400);
            }
            job.companyId = new Object(req.body.companyId);
            job.save().then(function(){
                return res.json({job: job});
            }).catch(next);
        })
    } else {
        return res.sendStatus(400);
    }
});

router.get('/', function(req, res, next){
    Job.find({}, function (err, jobs) {
        return res.send(jobs);
    }).catch(next);

});

router.get('/:jobId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.jobId)) {
        Job.findById(req.params.id).then(function (job) {
            if (!job) {
                return res.sendStatus(404);
            }
            return res.json({job: job});
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.get('/', function(req, res){
    Job.find({}, function (error, jobs) {
        if(error) {
            return res.sendStatus(400);
        }
        return res.json({job: jobs});
    });
});

router.put('/:jobId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.jobId)) {
        Job.findById(req.params.jobId).then(function (job) {
            if (!job) {
                return res.sendStatus(404);
            }
            // only update fields that were actually passed...
            if (typeof req.body.name !== 'undefined') {
                job.name = req.body.name;
            }
            if (typeof req.body.companyId !== 'undefined' &&
                mongoose.Types.ObjectId.isValid(req.params.companyId))  {
                Company.findById(req.body.companyId).then(function (res) {
                    if (!res) {
                        return res.sendStatus(400);
                    }
                    job.companyId = new Object(req.body.companyId);
                    job.save().then(function(){
                        return res.json({job: job});
                    }).catch(next);
                })
            } else {
                return res.sendStatus(400);
            }
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.delete('/:jobId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.jobId)) {
        Job.deleteOne({
            _id: req.params.jobId
        })
            .then(function (job) {
                if (!job) {
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