/**
 * Created by rcard on 02/09/2016.
 */
/*eslint no-unused-vars: ["off", { "argsIgnorePattern": "next" }]*/
var BusinessError = global.BusinessError,
    winston = require('winston');

module.exports = router => {
    router.use((error, req, res, next) => {
        let status;
        let message;
        if (error instanceof BusinessError) {
            status = 400;
            message = error.message;
        } else {
            status = error.status || 500;
            message = error.message || 'Unknown error';
        }
        let info;
        if (status != 500) {
            info = error.data || {};
            info.message = message;
        } else {
            winston.error(error);
            info = {message};
            if (router.get('env') === 'development') {
                info.error = error;
            }
        }
        res.status(status).send(info);
    });

    return router;
};