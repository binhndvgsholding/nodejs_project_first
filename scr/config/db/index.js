// require('dotenv/config');
// module.exports ={
//     HOST :process.env.DB_HOST,
//     USER: process.env.DB_USER,
//   PASSWORD:  process.env.DB_PASSWORD,
//   database: "your_database"
// }
const mysql = require("mysql");
const migration = require("mysql-migrations");
const connection = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "node_first",
});
migration.init(
  connection,
  __dirname + "/migrations",
  function () {
    console.log("finished running migrations");
  },
  ["--migrate-all"]
);

module.exports = connection;
