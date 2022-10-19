const bcrypt = require("bcrypt");
const saltRounds = 10;

//encriptamos la pass con el metodo hash, retorna la contraseña encriptada
const encrypt = async (pass) => {
  return await bcrypt.hash(pass, saltRounds);
};

//desencriptamos la pass con el metodo compare, retorna true o false

const decrypt = async (pass, hashedPass) => {
  return await bcrypt.compare(pass, hashedPass);
};

module.exports = { encrypt, decrypt };
