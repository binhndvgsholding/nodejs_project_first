const multer = require('multer');

const uploadImage = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});
module.exports = uploadImage