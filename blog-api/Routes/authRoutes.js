const express = require("express")

const router = express.Router()
const authController = require("../Controllers/authController")
const multer = require("multer");
const storage = require("../storage");

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 16, 
    },
    fileFilter: function (req, file, cb) {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and GIF files are allowed."), false);
      }
    },
  });

router.route("/login").post(authController.login)
router.route("/signup").post(authController.signUp)
router.route("/signup/").put(authController.protect,  upload.single("image"),authController.profile);
router.route("/change").put(authController.protect, authController.password);


module.exports = router