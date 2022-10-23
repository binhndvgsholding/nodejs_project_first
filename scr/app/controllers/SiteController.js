const UserModel = require("../models/User");
class SiteController {
  index(req, res) {
    res.render("pages/home");
  }
}
module.exports = new SiteController();
