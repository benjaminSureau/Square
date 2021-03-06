const express = require('express')
    , router = express.Router();

router.use('/users', require('./users'));
router.use('/companies', require('./companies'));
router.use('/notifications', require('./notifications'));
router.use('/hobbies', require('./hobbies'));
router.use('/skills', require('./skills'));
router.use('/qualifications', require('./qualifications'));
router.use('/jobs', require('./jobs'));
router.use('/activityDomains', require('./activityDomains'));


/*router.use('/profiles', require('./profiles'));
router.use('/articles', require('./articles'));
router.use('/tags', require('./tags'));*/

/*router.use(function(err, req, res, next){
    if(err.name === 'ValidationError'){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key){
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }

    return next(err);
});*/

module.exports = router;