const hbs = require("express-handlebars");
const express = require("express");
const PORT = 3000;
const app = express();
const path = require("path");
const routeForm = require("./routes/form");
const session = require("express-session");
const authorized = require ("./helpers/authorized")
//coneccion con mongo atlas
require("./config/mongo.js");

//express-hbs config
app.engine(".hbs", hbs.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.engine(
  "hbs",
  hbs.engine({
    helpers: require("./helpers/helpers.js").helpers,
    extname: ".hbs",
  })
);

/*definimos la carpeta de recursos estáticos, se agrega path.join para que reuna todos los 
argumentos y los normalice para que tenga una ruta que sirba para cualquier sistema*/
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
/*habilito la lectura de datos del body de la req,
reconoce el objeto de solicitud en cadena*/
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));


//variable globales local (muestra el msj al usuario cuando envia su consulta de form)
app.locals.sendQueryStatus = " ";

app.get("/", (req, res) => {
  res.render("home", { user: req.session.user });
});

app.get("/secret", authorized, (req, res)=>{
  res.render("secret", { user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id })
})

app.get("/restricted", (req, res)=>{
  res.render("restricted")
})

app.use("/users", require ("./routes/usersRouters"))
app.use(routeForm);

//page error
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/notFound.html");
});

app.listen(PORT, (err) => {
  !err
    ? console.log(`server running on http://localhost:${PORT}`)
    : console.log(`server running on http://localhost:${PORT}`);
});
