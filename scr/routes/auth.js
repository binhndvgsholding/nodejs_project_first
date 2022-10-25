const express = require("express");
const uploadImage = require("../utils/uploadMiddleware");
const authMiddleware = require('../app/middlewares/authMiddleware');
const router = express.Router();
const { validate } = require("../utils/validate");
const authController = require("../app/controllers/AuthController");
router.get("/register", authMiddleware.isAuth, authController.register);

router.post(
  "/postRegister",
  uploadImage.single("img"),
  validate.validateRegisterUser(),
  authController.postRegister
);
router.post(
  "/postLogin",
  validate.validateLogin(),
  authController.postLogin
);

router.get("/logout", authMiddleware.loggedin ,authController.logout);

router.get("/",authMiddleware.isAuth, authController.login);

module.exports = router;
