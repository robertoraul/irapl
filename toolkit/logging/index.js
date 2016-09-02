/**
 * Created by rcard on 02/09/2016.
 */
var winston = require('winston');

module.exports = winston;
require('./mongodbLogger')(winston);
require('./mailLogger')(winston);
