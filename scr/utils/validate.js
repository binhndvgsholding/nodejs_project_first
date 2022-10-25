const { body } = require("express-validator");

const validateRegisterUser = () => {
  return [
    body("name", "Họ tên không được bỏ trống").not().isEmpty(),
    body("email", "Email không được bỏ trống").not().isEmpty(),
    body("phone", "Điện thoại không được bỏ trống").not().isEmpty(),
    body("pass", "Mật khẩu không được bỏ trống").not().isEmpty(),
  ];
};

const validateLogin = () => {
  return [
    body("email", "Email không được bỏ trống").not().isEmpty(),
    body("pass", "Mật khẩu không được bỏ trống").not().isEmpty(),
  ];
};

const validate = {
  validateRegisterUser: validateRegisterUser,
  validateLogin: validateLogin,
};

module.exports = { validate };
