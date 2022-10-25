const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");
const authMiddleware = require('../app/middlewares/authMiddleware');
router.get("/404",authMiddleware.loggedin, siteController.error404);
router.get("/",authMiddleware.loggedin, siteController.index);
module.exports = router;
