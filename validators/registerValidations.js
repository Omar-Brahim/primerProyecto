const { body, validationResult } = require("express-validator");

//creo las reglas de validacion campo por campo, con un middlerware
const registerValidations = [
  body("nombre")
    .notEmpty().withMessage("Campo obligatorio")
    .isLength({ min: 2, max: 15 })
    .withMessage("maximo de caracteres 15"),
  body("apellido")
    .notEmpty().withMessage("Campo obligatorio")
    .isLength({ min: 2, max: 15 })
    .withMessage("maximo de caracteres 15"),
  body("email")
    .notEmpty().withMessage("Campo obligatorio")
    .isEmail().withMessage("Debe ingresar un email válido"),
  body("pass")
    .notEmpty().withMessage("Campo obligatorio")
    .trim(" ")
    .isLength({ min: 4, max: 10 }).withMessage("Debe ingresar una contraseña"),

  /* creo una funcion para que detecte posibles errores*/

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const formData = req.body
      const arrWarnings = errors.array();
      res.render("register", { arrWarnings, formData })
    } else return next()
  }
]
module.exports = registerValidations;