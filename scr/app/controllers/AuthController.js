const UserModel = require("../models/User");
const path = require('path');
const uploadImage = require('../../utils/uploadMiddleware');
const resizeImage = require('../../utils/resizeImage');
var {validationResult} = require('express-validator');
class AuthController {

  login(req, res) {
    res.render("auth/login", { layout: false });
  }
  register(req, res) {
    req.flash('hihi',[{name:'loi to dau',age:19},{name:'loi to dau',age:19}])
    res.render("auth/register", { layout: false, mess: req.flash('error') , haha:  req.flash('hihi') });
  }
  async  postRegister(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error',  errors.array())
      return  res.redirect('back');
    }
    const formData = req.body;
    const imagePath = path.join('scr/public/img');
    const fileUpload = new resizeImage(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Ảnh không đúng định dạng'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    formData.img = filename;
    formData.status = 0;
    console.log(formData);
    UserModel.insert(formData);
    return res.status(200).json({ img: filename });
  }
}
module.exports = new AuthController();
