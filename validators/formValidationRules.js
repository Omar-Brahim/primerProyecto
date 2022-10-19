const { body, validationResult } = require("express-validator");

//creo las reglas de validacion campo por campo, con un middlerware
const formValidationRules = [
  body("nombre")
    .notEmpty().withMessage("Campo obligatorio")
    .isLength({ min: 2, max: 15 })
    .withMessage("maximo de caracteres 30"),
  body("email")
    .notEmpty().withMessage("Campo obligatorio")
    .isEmail().withMessage("Debe ingresar un email válido"),
  body("mensaje")
    .notEmpty().withMessage("Campo obligatorio")
    .trim(" ")
    .isLength({ min: 10, max: 300 }).withMessage("Mensaje debe contener entre 10 y 300 caracteres"),

  /* creo una funcion para que detecte posibles errores*/

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const formData = req.body
      const arrWarnings = errors.array();
      res.render("form", { arrWarnings, formData })
    } else return next()
  }
]
module.exports = formValidationRules;
