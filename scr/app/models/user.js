const { queryDB } = require("../../utils/queryDB");
const dbconnect = require("../../config/db");
const Querybuilder = require("./querybuilder");
class User {
  table = "users";

  fillable = ["name", "email", "phone", "pass", "img", "status"];

  getList(req, result) {
    const params = req.query;
    let sql = Querybuilder.get(this.table);
    sql += ` where id != ${params.id} `;
    
    if (params.q) {
      sql += ` AND name LIKE '%${params.q.trim()}%' `;
    }
    if (params.limit) {
      sql += ` LIMIT ${params.limit} OFFSET 1`;
    }
    dbconnect.query(sql, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }
  getListUserMess(req,result){
    const params = req;
    let sql =`SELECT users.id as userId, users.name, users.img,messages.* FROM users JOIN messages on users.id = messages.receiver_id OR users.id =messages.sender_id WHERE users.id !=${params.id} AND ( messages.sender_id = ${params.id} OR messages.receiver_id=${params.id} ) AND messages.id IN (SELECT max(messages.id) as maxId FROM users JOIN messages on users.id = messages.receiver_id OR users.id =messages.sender_id WHERE users.id !=${params.id} AND ( messages.sender_id =${params.id} OR messages.receiver_id=${params.id} ) GROUP BY users.id) ORDER BY messages.created_at DESC`
    dbconnect.query(sql, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  insert(req, result) {
    const value = [
      [req.name, req.email, req.phone, req.pass, req.img, req.status],
    ];
    const sql = Querybuilder.insert(this.table, this.fillable);
    dbconnect.query(sql, [value], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  update(req, result) {
    const value = [req.name, req.email, req.phone, req.img, req.status, req.id];
    const sql =
      "UPDATE users SET name=?,email=?,phone=?,img=?,status=? WHERE id=?";
    dbconnect.query(sql, value, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  delete(req, result) {
    const sql = Querybuilder.delete(this.table, "id");
    dbconnect.query(sql, [req], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  findUser(req, result) {
    const sql = Querybuilder.whereColum(this.table, "id", "=");
    dbconnect.query(sql, req, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  checkUser(req, result) {
    const sql = Querybuilder.whereColum(this.table, "email", "=");
    dbconnect.query(sql, req, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  login(req, result) {
    const sql = Querybuilder.whereAndColum(
      this.table,
      ["email", "pass"],
      ["=", "="]
    );
    dbconnect.query(sql, req, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }
}
module.exports = new User();
