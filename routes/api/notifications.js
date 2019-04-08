const mongoose = require('mongoose');
const router = require('express').Router();
const Notification = mongoose.model('Notification');

router.post('/', function(req, res, next){
        let notification = new Notification();

        notification.status = req.body.status;
        notification.content = req.body.content;
        notification.accountId = new Object(req.body.accountId);

        notification.save().then(function(){
            return res.json({notification: notification});
        }).catch(next);
});

router.get('/:notificationId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.notificationId)) {
        Notification.findById(req.params.notificationId).then(function (notification) {
            if (!notification) {
                return res.sendStatus(404);
            }
            return res.json({notification: notification});
        }).catch(next);
    } else {
        return res.sendStatus(400);
    }
});

router.put('/:notificationId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.notificationId)) {
        Notification.findById(req.params.notificationId).then(function (notification) {
            if (!notification) {
                return res.sendStatus(404);
            }

            // only update fields that were actually passed...
            if (typeof req.body.status !== 'undefined') {
                notification.status = req.body.status;
            }
            if (typeof req.body.content !== 'undefined') {
                notification.content = req.body.content;
            }
            if (typeof req.body.accountId !== 'undefined') {
                notification.accountId = req.body.accountId;
            }
            return notification.save().then(function () {
                return res.json({notification: notification});
            });
        }).catch(next);
    }else {
        return res.sendStatus(400);
    }
});

router.delete('/:notificationId', function(req, res, next){
    if (mongoose.Types.ObjectId.isValid(req.params.notificationId)) {
        Notification.deleteOne({
            _id: req.params.notificationId
        })
            .then(function (notification) {
                if (!notification) {
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