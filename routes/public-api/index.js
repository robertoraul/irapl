/**
 * Created by rcard on 05/09/2016.
 */
var model = global.app.model,
    hash = global.app.security.hash,
    appDomain = require('../../services/appDomain'),
    passwordGenerator = require('../../services/passwordGenerator'),
    passwordEmail = require('../../services/passwordEmail');

module.exports = function (router) {
    router.post('/sign-in', (req, res, next) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({message: 'Missing user or password!'});
        }
        model.User.findOne({
            _id: req.body.username,
            password: hash(req.body.password),
            disabled: false
        }, {password: 0}).exec().then(
            user => {
                if (!user) {
                    return res.sendStatus(403);
                }
                // TODO AN use toObject method
                req.session.user = user.toObject();
                res.sendStatus(200);
            },
            err => next(Error.create('An error occurred trying to authenticate the user.', {_id: req.body.username}, err))
        );
    });

    router.post('/passwordRecovery', (req, res, next) =>
        model.User.findOne({_id: req.body.username, disabled: {$ne: true}}).exec().then(
            user => {
                if (!user) {
                    return res.sendStatus(403);
                }
                var password = passwordGenerator.generate();
                user.password = hash(password);
                return user.save().then(() => passwordEmail.send(user, password, appDomain.get(req)));
            }
        ).then(
            () => res.sendStatus(200),
            err => next(Error.create('An error occurred trying to authenticate the user.', {_id: req.body.username}, err))
        )
    );

    return router;
};
