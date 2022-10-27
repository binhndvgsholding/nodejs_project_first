const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const uploadImage = require("../../utils/uploadMiddleware");
const resizeImage = require("../../utils/resizeImage");
var { validationResult } = require("express-validator");
class AuthController {
  login(req, res) {
    const mess = req.flash("error");
    const dataOld = req.flash("dataOld");
    const success = req.flash("success");
    res.render("auth/login", {
      layout: false,
      mess: mess,
      success: success,
      old: dataOld[0],
    });
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
    if (!req.file) {
      return res.status(401).json({ error: "Ảnh không đúng định dạng" });
    }
    const filename = await fileUpload.save(req.file.buffer);
    formData.img = filename;
    formData.status = 0;
    if (!errors.isEmpty()) {
      req.flash("error", errors.array());
      req.flash("dataOld", formData);
      return res.redirect("back");
    }
    UserModel.checkUser(formData.email, (err, data) => {
      if (err) {
        res.redirect("/404");
      } else if (data.length > 0) {
        console.log(data);
        req.flash("dataOld", formData);
        req.flash("success", "Tài khoản đã tồn tại");
        return res.redirect("back");
      } else {
        console.log(formData.pass);
        bcrypt.hash(formData.pass, 10).then((hashed) => {
          formData.pass = hashed;
          UserModel.insert(formData, (err, data) => {
            if (err) {
              res.redirect("/404");
            } else {
              req.flash("success", "Đăng ký tài khoản thành công");
              return res.redirect("back");
            }
          });
        });
      }
    });
  }
  async postLogin(req, res) {
    const errors = validationResult(req);
    const formData = req.body;
    if (!errors.isEmpty()) {
      req.flash("error", errors.array());
      req.flash("dataOld", formData);
      return res.redirect("back");
    }
    UserModel.checkUser(formData.email, (err, data) => {
      if (err) {
        res.redirect("/404");
      } else if (data.length < 1) {
        console.log(data);
        req.flash("dataOld", formData);
        req.flash("success", "Tai khoan hoac mat khau khong chinh xac ");
        return res.redirect("back");
      } else {
        bcrypt.compare(
          formData.pass,
          data[0].pass.toString(),
          function (err, result) {
            console.log(result);
            if (result == true) {
              req.session.loggedin = true;
              req.session.user = data[0];
              res.redirect("/");
            } else {
              console.log(data);
              req.flash("dataOld", formData);
              req.flash("success", "Tai khoan hoac mat khau khong chinh xac");
              return res.redirect("back");
            }
          }
        );
      }
    });
  }
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) res.redirect("/404");
      res.redirect("/auth");
    });
  }
}
module.exports = new AuthController();
