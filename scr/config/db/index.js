// require('dotenv/config');
// module.exports ={
//     HOST :process.env.DB_HOST,
//     USER: process.env.DB_USER,
//   PASSWORD:  process.env.DB_PASSWORD,
//   database: "your_database"
// }
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_first"
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log("ok r binh!!!")
  });
module.exports = connection