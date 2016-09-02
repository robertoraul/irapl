/**
 * Created by rcard on 02/09/2016.
 */
var winston = require('winston'),
    pkg = require('../package.json');

// Extensions
require('./extensions/errorExtensions');
global.BusinessError = require('./extensions/BusinessError');

global.app = {name: pkg.name, version: pkg.version, description: pkg.description};

global.app.config = require('../config.json');
require('./logging');

global.app.data = require('./data');
global.app.server = require('./server');
global.app.validation = require('./validation');
global.app.security = require('./security');

global.app.start = ()=> {
    winston.info('Starting application...');
// Setting environment flag.
    if (global.app.config.mode == 'prod') {
        process.env.NODE_ENV = 'production';
    }
    global.app.data.mongoose.connect(global.app.config.connectionString).then(
        ()=> {
            global.app.model = require('../model');
            global.app.server.start();
        }, err => winston.error('Error connecting database: %s', err)
    );
};

module.exports = global.app;