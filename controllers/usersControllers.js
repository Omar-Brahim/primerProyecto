const session = require("express-session");
const securePass = require("../helpers/securePass");
const User = require("../schemas/usersSchema");

//login
function getLoginForm(req, res, next) {
  res.render("login");
};
//procesamos login
async function sendLoginForm(req, res, next) {
  const {email, pass} = req.body;
  const user = await User.find().where({email}) //busca en la base de datos si esta el email repetido
  if(!user.length){
    return res.render ("login", {message: "Usuario o contraseña incorrectos"})
  };
  if(await securePass.decrypt(pass, user[0].password)){
    const usr = {
      id: user[0]._id,
      name: user[0].name,
      lastName: user[0].lastName
    }
    req.session.user = usr
    res.render("secret", {user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id })
  } else return res.render ("login", {message: "Usuario o contraseña incorrectos"})  
};

function getRegisterForm(req, res, next) {
  res.render("register");
}

//se procesa formulario y crea un nuevo usuario
async function sendRegisterForm(req, res, next) {
  const {nombre, apellido, email, age, bando, pass} = req.body;
  const password = await securePass.encrypt(pass);

  const newUser = new User({
    name: nombre, lastName: apellido, email, password, age, bando,
  });
  const usr = {
    id: newUser._id,
    name: newUser.name,
    lastName: newUser.lastName
  }
  newUser.save((err)=>{
    if(!err){
      req.session.user = usr
      res.render("secret", {user:`${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id})
    }else {
      console.log(err);
      res.render("register", {message: "Email ya registrado"})
    }
  })
}

//mostramos settings
async function getSettings(req, res){
  const user = await User.findById(req.session.user.id).lean()// en la base de datos busca el form con el id y los muestra
  res.render("editRegister", { user })
}
//procesamos form settings
async function sendSettings(req, res){
  try {
    await User.findByIdAndUpdate(req.session.user.id, req.body)
    res.redirect("/secret")
  } catch (err){
    res.render("editRegister", {massage: "Ocurrió un error, intenta nuevamente"})
  }
}
//borramos un documento de la base de datos
async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.session.user.id)
    req.session.destroy()
    res.redirect("/")
  } catch (err) {
    res.render("editRegister", { message: "Ocurrió un error, intenta nuevamente" })
  }
}
//validate email
async function validateEmail(req, res){
  res.send("email validation")
}
//logout
function logout(req, res){
  req.session.destroy()
  res.redirect("/");
}

module.exports = { getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, getSettings, sendSettings, validateEmail, deleteUser, logout };
