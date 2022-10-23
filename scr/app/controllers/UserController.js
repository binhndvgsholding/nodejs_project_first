const UserModel = require("../models/User");
class UserController {
  index(req, res) {
    res.render("pages/user/home");
  }
}
module.exports = new UserController();
