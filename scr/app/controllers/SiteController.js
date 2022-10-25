const UserModel = require("../models/User");
class SiteController {
  index(req, res) {
    const auth= req.session.user
    console.log(auth);
    res.render("pages/home", { auth : auth});
  }
  error404(req, res) {
    res.render("pages/404", {layout:false});
  }
}
module.exports = new SiteController();
