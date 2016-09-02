/**
 * Created by rcard on 02/09/2016.
 */
var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

module.exports = mongoose;
