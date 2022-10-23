const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const route = require("./routes");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
const port = 3000;
route(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
const db = require("./config/db");
app.listen(port, () => {
  console.log(` App listening on port ${port}`);
});
