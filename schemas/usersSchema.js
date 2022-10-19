// requerimos mongoose para conectarse con mongoDB
const mongoose = require("mongoose");
//requerimos de mongoose un constructor de schemas
const { Schema, model } = require("mongoose");
//creamos el schema del usuario con algunas validaciones
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true },
    password: { type: String, required: true },
    age: { type: String, required: true },
    bando: { type: String, required: true },
    validEmail: {Type: Boolean, default: false }
  },
  { timestamps: true } //nos crea un campo donde nos dice cuando se creo y se modifico
);

//creo un  modelo para trabajar con los datos
const User = model("User", userSchema);
module.exports = User;
