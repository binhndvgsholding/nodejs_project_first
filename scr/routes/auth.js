const express = require("express");
const uploadImage = require('../utils/uploadMiddleware');
const router = express.Router();
const {validate} = require('../utils/validate')
const authController = require("../app/controllers/AuthController");
router.get("/register", authController.register);
router.post("/postRegister", uploadImage.single('img'), validate.validateRegisterUser(), authController.postRegister);
router.get("/", authController.login);
module.exports = router;
