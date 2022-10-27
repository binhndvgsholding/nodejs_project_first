const express = require("express");
const uploadImage = require("../utils/uploadMiddleware");
const { validate } = require("../utils/validate");
const authMiddleware = require("../app/middlewares/authMiddleware");
const router = express.Router();
const userController = require("../app/controllers/UserController");
router.post("/update", uploadImage.single("img"), userController.update);
router.get("/delete/:id", userController.delete);
router.get("/", authMiddleware.loggedin, userController.index);
module.exports = router;
