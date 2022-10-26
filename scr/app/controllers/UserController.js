const UserModel = require("../models/User");
class UserController {
  index(req, res) {
    UserModel.getList(req,(err,data) =>{
      if (err) res.redirect('/404')
      else{
        res.locals.oldReq = req.query
        res.render("pages/acount/index",{dataUser:data});
      } 
    })

  }
}
module.exports = new UserController();
