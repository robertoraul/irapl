/**
 * Created by rcard on 02/09/2016.
 */
var options = global.app.config.winston.mail;

options.formatter = data => {
    var meta = JSON.stringify(data.meta, null, '&emsp;').replace(/\n/g, '<br/>');
    var stack = '';
    if (data.meta.stack) {
        stack = JSON.stringify(data.meta.stack).replace(/\sat\s/g, '<br/>at ');
    }
    return `${data.level} ${data.message}<br/><br/>${meta}<br/><br/>${stack}<br/><br/><small>Please do not reply to this automated message.</small>`;
};

module.exports = logger => logger.add(require('winston-mail').Mail, options);
