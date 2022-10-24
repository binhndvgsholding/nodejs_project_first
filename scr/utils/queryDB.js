const dbconnect = require("../config/db");
const queryDB = (sql, value) =>
  new Promise((resolve, reject) => {
    try {
      dbconnect.query(sql, value, (error, result) => {
        if (error) reject(error);
        resolve(result);
        return result;
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports = { queryDB };
