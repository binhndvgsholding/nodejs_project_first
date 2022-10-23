const UserModel = require("../models/User");
class AuthController {
  login(req, res) {
    res.render("auth/login", { layout: false });
  }
  register(req, res) {
    res.render("auth/register", { layout: false });
  }
}
module.exports = new AuthController();
