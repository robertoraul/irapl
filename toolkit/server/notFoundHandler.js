/**
 * Created by rcard on 02/09/2016.
 */

module.exports = router => {
    router.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    return router;
};
