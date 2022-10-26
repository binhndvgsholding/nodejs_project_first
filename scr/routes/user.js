const express = require("express");
const authMiddleware = require('../app/middlewares/authMiddleware');
const router = express.Router();
const userController = require("../app/controllers/UserController");
router.get("/", userController.index);
module.exports = router;
