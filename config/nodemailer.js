const nodemailer = require("nodemailer");
require("dotenv").config();

//la funcion transport lleva la consulta del usuario a nuetro mail
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

module.exports = transport;
