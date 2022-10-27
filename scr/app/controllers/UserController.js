const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const uploadImage = require("../../utils/uploadMiddleware");
const resizeImage = require("../../utils/resizeImage");
var { validationResult } = require("express-validator");
class UserController {
  index(req, res) {
    UserModel.getList(req, (err, data) => {
      if (err) res.redirect("/404");
      else {
        const success = req.flash("success");
        res.locals.oldReq = req.query;
        res.render("pages/acount/index", { dataUser: data, mess: success });
      }
    });
  }
  async update(req, res) {
    const formData = req.body;
    const imagePath = path.join("scr/public/img");
    const fileUpload = new resizeImage(imagePath);
    const filename = req.file ? await fileUpload.save(req.file.buffer) : "";
    formData.img = filename;
    UserModel.findUser(formData.id, (err, data) => {
      if (err) res.redirect("/404");
      else {
        if (!req.file) {
          formData.img = data[0].img;
        }
        UserModel.update(formData, (err, data) => {
          if (err) res.redirect("/404");
          else {
            req.flash("success", "update thành công");
            res.redirect("back");
          }
        });
      }
    });
  }

  delete(req, res) {
    UserModel.delete(req.params.id, (err, data) => {
      if (err) res.redirect("/404");
      else {
        req.flash("success", "Xóa thành công");
        res.redirect("back");
      }
    });
  }
}
module.exports = new UserController();
