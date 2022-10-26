const express = require("express");
const path = require("path");
const Handlebars = require("express-handlebars");
const isEqualHelperHandlerbar = require('./utils/helper') ;
const route = require("./routes");
const morgan = require("morgan");
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
app.engine("hbs", Handlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true,  }
));
app.use(session({
  secret: 'codeforgeek',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 10000000 }
}));
  app.use(flash());

 
route(app);
app.use(express.static(path.join(__dirname, "public")));
const db = require("./config/db");
app.listen(port, () => {
  console.log(` App listening on port ${port}`);
});
