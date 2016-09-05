var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(global.app.config.email);

module.exports.send = (user, password, domain) => transporter.sendMail({
    from: 'GPSS',
    to: user.email,
    subject: '[GPSS] Envio de Contraseña',
    html: `Hola ${user.name},<br/><br/>Le enviamos su usuario su ingresar al <a href="${domain}">Sistema de gestión</a>.<br/>Usuario: <strong>${user._id}</strong><br/>Password: <strong>${password}</strong><br/><br/>GPSS<br/><small>Por favor no responda este mail, esta es una casilla automática.</small>`
});
