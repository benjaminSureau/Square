const mongoose = require('mongoose');
const router = require('express').Router();
const Company = mongoose.model('Company');

router.post('/', function(req, res, next){
    let company = new Company();

    company.name = req.body.name;
    company.siret = req.body.siret;
    company.siren = req.body.siren;
    company.description = req.body.description;

    company.save().then(function(){
        return res.json({company: company});
    }).catch(next);
});

router.get('/', function(req, res, next){
    Company.find({}, function (err, companies) {
        return res.send(companies);
    }).catch(next);

});

router.get('/:companyId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.companyId)) {
        Company.findById(req.params.companyId).then(function (company) {
            if (!company) {
                return res.sendStatus(404);
            }
            return res.json({company: company});
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.put('/:companyId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.companyId)) {
        Company.findById(req.params.companyId).then(function (company) {
            if (!company) {
                return res.sendStatus(404);
            }

            // only update fields that were actually passed...
            if (typeof req.body.name !== 'undefined') {
                company.name = req.body.name;
            }
            if (typeof req.body.siret !== 'undefined') {
                company.siret = req.body.siret;
            }
            if (typeof req.body.siren !== 'undefined') {
                company.siren = req.body.siren;
            }
            if (typeof req.body.description !== 'undefined') {
                company.description = req.body.description;
            }
            return company.save().then(function () {
                return res.json({company: company});
            });
        }).catch(next);
    }else {
        return res.sendStatus(400);
    }
});

router.delete('/:companyId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.companyId)) {
        Company.deleteOne({
            _id: req.params.companyId
        })
            .then(function (company) {
                if (!company) {
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