//Dùng để import express
const express = require("express");
require("dotenv").config();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");

const routeClient = require(`${__dirname}/routes/client/index.route`);
const routeAdmin = require(`${__dirname}/routes/admin/index.route`);

const mongoose = require("mongoose");
const database = require(`${__dirname}/config/database`);

const systemConfig = require(`${__dirname}/config/system`);

database.connect();

const app = express();
const port = process.env.PORT;

//setting pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(methodOverride("_method"));

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// set up public folder
app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Flash
app.use(cookieParser("ABCANAANAcxzxfgf"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
routeClient(app);
routeAdmin(app);

// mongoose.connect(process.env.MONGO_URL);

//Kết nối đến server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
