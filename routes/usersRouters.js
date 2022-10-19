const router = require("express").Router();
const users = require("../controllers/usersControllers");
const registerValidations = require("../validators/registerValidations");

router.get("/login", users.getLoginForm);
router.post("/login", users.sendLoginForm);
router.get("/register", users.getRegisterForm);
router.post("/register", registerValidations, users.sendRegisterForm);
router.get("/logout", users.logout);
router.get("/settings", users.getSettings);
router.post("/settings", users.sendSettings);
router.get("/validate", users.validateEmail);
router.get("/delete", users.deleteUser);

module.exports = router;
