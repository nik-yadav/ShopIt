const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tshirts");
  },

  filename: (req, file, cb) => {
    console.log("file= ", file);
    const name = Date.now() + path.extname(file.originalname);
    req.imageName = name;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};
