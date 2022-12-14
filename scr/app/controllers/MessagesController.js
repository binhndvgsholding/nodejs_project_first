const UserModel = require("../models/User");
const MessModel = require("../models/messages");
const bcrypt = require("bcrypt");
const path = require("path");
const uploadImage = require("../../utils/uploadMiddleware");
const resizeImage = require("../../utils/resizeImage");
var { validationResult } = require("express-validator");
class MessagesController {
  index(req, res) {
  const receiver=[]
  const users=[]
    req.id = res.locals.user.id;
    if(req.query.q){
      req.query.id = res.locals.user.id;
      UserModel.getList(req, (err, listUser) => {
        users.push(listUser)
      })
    }

    UserModel.getListUserMess(req, (err, dataUser) => {
      if (err) res.redirect("/404");
      else {
        res.locals.oldReq = req.query;
        if(!req.query.id_user) res.render("pages/messages/index", { dataUser: dataUser,userSearch:users[0]}); 
        else{
        UserModel.findUser(req.query.id_user,(err,res)=>{
          receiver.push(res[0])
        }),
        MessModel.getMessUser([res.locals.user.id,req.query.id_user],
             (err, dataMessUser)=>{
              if (err) res.redirect("/404");
              else{

                 res.render("pages/messages/index",
                  { 
                     status: true,
                     dataUser: dataUser,
                     dataMessUser: dataMessUser,
                     dataReceiver : receiver[0],
                     userSearch:users[0]
                  });
            
             } 
          })
        }
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
            req.flash("success", "update th??nh c??ng");
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
        req.flash("success", "X??a th??nh c??ng");
        res.redirect("back");
      }
    });
  }
}
module.exports = new MessagesController();
