var server = global.app.config.server;

module.exports.get = req => {
    if (server && server.domain) {
        return `${req.protocol}://${server.domain}`;
    }
    var port = req.app.settings.port;
    return `${req.protocol}://${req.hostname}${port == 80 || port == 443 ? '' : ':' + port}`;
};
