const {body} = require('express-validator');

const validateRegisterUser = () => {
  return [ 
    body('name', 'username does not Empty').not().isEmpty(),
    body('name', 'username must be Alphanumeric').isAlphanumeric(),
    body('name', 'username more than 6 degits').isLength({ min: 6 }),
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('phone', 'phone does not Empty').not().isEmpty(),
    body('img', 'image does not Empty').not().isEmpty(),
    body('pass', 'password more than 6 degits').isLength({ min: 6 })
  ]; 
}

const validateLogin = () => {
  return [ 
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('pass', 'password more than 6 degits').isLength({ min: 6 })
  ]; 
}

const validate = {
  validateRegisterUser: validateRegisterUser,
  validateLogin: validateLogin
};

module.exports = {validate};