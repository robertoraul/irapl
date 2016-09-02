/**
 * Created by rcard on 02/09/2016.
 */
// express modules
var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path'),
    errorHandler = require('./errorHandler');

var server = module.exports;

server.start = function () {
    var api = app.api = express();
    api.set('port', app.config.server.port);

// view engine setup
    api.set('views', path.join(__dirname, '../../public/views'));
    api.set('view options', {layout: false});
    api.engine('html', require('justhtml').__express);
    api.set('view engine', 'html');

    api.use(require('serve-favicon')(path.join(__dirname, '../../public/favicon.ico')));

// javascript and css libraries loaded using Bower.
    api.use(express.static(path.join(__dirname, '../../bower_components')));
    api.use(express.static(path.join(__dirname, '../../public')));

    api.use(logger(app.config.logger || (api.get('env') === 'development' ? 'dev' : 'combined')));

    api.use(bodyParser.json(app.config.server.request.bodyParser));
    api.use(bodyParser.urlencoded(app.config.server.request.bodyParser));
    api.use(require('cookie-parser')(app.config.auth.sessionSecret));
    api.use(require('cookie-session')({secret: app.config.auth.sessionSecret}));

    require('../../routes/')(api);
    require('./notFoundHandler')(api);
    require('./errorHandler')(api);

    api.listen(api.get('port'), () => winston.info('%s started at port %s', global.app.name, api.get('port')));
};

