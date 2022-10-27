// const authMiddleware = require('../app/middlewares/authMiddleware');
const userRouter = require("./user");
const siteRouter = require("./site");
const authRouter = require("./auth");
const MessRouter = require("./messages");
function route(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/messages", MessRouter);
  app.use("/", siteRouter);
}

module.exports = route;
