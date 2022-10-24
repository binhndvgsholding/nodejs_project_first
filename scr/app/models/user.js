const { queryDB } = require("../../utils/queryDB");
const Querybuilder = require("./querybuilder");
class User {
   table = 'users';
   fillable= ['name','email', 'phone','pass','img','status'];
  constructor(){
  }
  index(req, res) {}
  insert(req, res){
   const value =[
    [ req.name,
      req.email,
      req.phone,
      req.pass,
      req.img,
      req.status ]
    ]
    const sql = Querybuilder.insert(this.table,this.fillable)
    queryDB(sql,value)  ;
  }
}
module.exports = new User();
