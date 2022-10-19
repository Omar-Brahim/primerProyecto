//configuracion de mongoDB
const mongoose = require("mongoose");
require("dotenv").config;
const URI = process.env.DB_URI;

//se hace la coneccion con mongoose
mongoose.connect(URI, (err) => {
  err ? console.log(err) : console.log("Conectado con Mongo Atlas");
});
