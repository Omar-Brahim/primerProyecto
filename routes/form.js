const routerForm = require("express").Router();
const transport = require("../config/nodemailer");
const formValidationRules = require("../validators/formValidationRules");

routerForm.get("/form", (req, res) => {
  res.render("form");
});

/*pongo un middleware para que valide el formulario,
 una vez validado continua con la ruta */
routerForm.post("/form", formValidationRules, async (req, res) => {

  const { nombre, email, mensaje } = req.body;
  const emailMsg = {
    to: "atecionconsultas@mail.com",
    from: email,
    subject: "Msj formulario de contacto",
    html: `consulta de ${nombre}, email: ${email}, mensaje: ${mensaje}`,
  };
  /*validamos el estado de la consulta, si fue entregado con exito la peticion,
    y le muestra un mensaje en pantalla
    declaramos una variable que captura el estado de la operacion por eso uso async await*/
  const sendMailStatus = await transport.sendMail(emailMsg);
  if (sendMailStatus.rejected.length) {
    req.app.locals.sendQueryStatus = "Mensaje no enviado.";
  } else {
    req.app.locals.sendQueryStatus = "Mensaje enviado.";
  }
  res.redirect("/");
});

module.exports = routerForm;
