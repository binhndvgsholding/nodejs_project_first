const UserModel = require("../models/User");
const path = require("path");
const uploadImage = require("../../utils/uploadMiddleware");
const resizeImage = require("../../utils/resizeImage");
var { validationResult } = require("express-validator");
class AuthController {
  login(req, res) {
    res.render("auth/login", { layout: false });
  }
  register(req, res) {
    const mess = req.flash("error");
    const dataOld = req.flash("dataOld");
    const success = req.flash("success");
    res.render("auth/register", {
      layout: false,
      mess: mess,
      success: success,
      old: dataOld[0],
    });
  }
  async postRegister(req, res) {
    const errors = validationResult(req);
    const formData = req.body;
    const imagePath = path.join("scr/public/img");
    const fileUpload = new resizeImage(imagePath);

    if (!errors.isEmpty()) {
      req.flash("error", errors.array());
      req.flash("dataOld", formData);

      return res.redirect("back");
    }
    const check = UserModel.checkUser(formData.email);
    if (check) {
    }
    if (!req.file) {
      res.status(401).json({ error: "Ảnh không đúng định dạng" });
    }

    const filename = await fileUpload.save(req.file.buffer);
    formData.img = filename;
    formData.status = 0;
    UserModel.insert(formData);
    req.flash("success", "Đăng ký tài khoản thành công");
    return res.redirect("back");
  }
}
module.exports = new AuthController();
