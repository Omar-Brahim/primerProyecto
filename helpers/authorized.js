//middleware de verificacion de usuario
const authorized = (req, res, next) => {
  if (req.session.user) {
    next();
  } else res.render("restricted");
};
module.exports = authorized;
