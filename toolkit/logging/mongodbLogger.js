/**
 * Created by rcard on 02/09/2016.
 */
module.exports = logger => logger.add(require('winston-mongodb').MongoDB, global.app.config.winston.mongodb);
