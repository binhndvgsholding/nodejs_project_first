const { queryDB } = require("../../utils/queryDB");
const dbconnect = require("../../config/db");
const Querybuilder = require("./querybuilder");
class User {
  table = "users";

  fillable = ["name", "email", "phone", "pass", "img", "status"];

  constructor() {
  }

   getList(req, result) {
    const params = req.query
    let sql = Querybuilder.get(this.table);
    if(params.q){
      sql +=  ` where name like '%${params.q.trim()}%' `
    }
    if(params.limit){
      sql += ` LIMIT ${params.limit} OFFSET 1`
    }
      dbconnect.query(sql, (err, res) => {
      if (err) {
          result(err, null);
          return;
      }
      result(null, res);
    })
   }

   insert(req, result) {
    const value = [
      [req.name, req.email, req.phone, req.pass, req.img, req.status],
    ];
    const sql = Querybuilder.insert(this.table, this.fillable);
    dbconnect.query(sql,[value], (err, res) => {
      if (err) {
          result(err, null);
          return;
      }
      result(null, res);
    })
   }

   checkUser(req,result ) {
    const sql = Querybuilder.whereColum(this.table, "email", "=");
     dbconnect.query(sql,req, (err, res) => {
      if (err) {
          result(err, null);
          return;
      }
      result(null, res);
  })
   } 

    login(req, result){
  const sql = Querybuilder.whereAndColum(this.table,['email','pass'],['=','='])
  dbconnect.query(sql,req, (err, res) => {
    if (err) {
        result(err, null);
        return;
    }
    result(null, res);
})
   }
}
module.exports = new User();
