const { queryDB } = require("../../utils/queryDB");
const dbconnect = require("../../config/db");
const Querybuilder = require("./querybuilder");
class Messages {
  table = "messages";

  fillable = ["sender_id", "receiver_id", "content","created_at"];

  getMessUser(req, result) {
    let sql =  `SELECT m.*,u.name,u.img, u.id as usersId FROM messages as m JOIN users as u ON m.sender_id= u.id where m.sender_id IN (${req}) And m.receiver_id IN (${req}) `;
    // Querybuilder.whereAndColum(this.table,['sender_id','receiver_id'],['=','=']);
    dbconnect.query(sql,(err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      
      result(null, res);
    });
  }

  insert(req, result) {
    const value = [
      [req.sender_id, req.receiver_id, req.content, req.created_at],
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
  
  whereReceiver(req, result) {
    const sql = Querybuilder.whereColum(this.table, "receiver_id", "=");
    dbconnect.query(sql, req, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

}
module.exports = new Messages();
