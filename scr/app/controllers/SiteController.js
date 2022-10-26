const UserModel = require("../models/User");
class SiteController {
  index(req, res) {
 
    res.render("pages/home",);
  }
  error404(req, res) {
    res.render("pages/404", {layout:false});
  }
}
module.exports = new SiteController();
