const dbconnect = require("../config/db");
const queryDB = (sql, value) =>
{
  new Promise((resolve, reject) => {
    try {
      dbconnect.query(sql, value, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  }).then(function(result){
    return result
     
  });
}


module.exports = { queryDB };
