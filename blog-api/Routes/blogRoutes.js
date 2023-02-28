const express = require("express");
const router = express.Router();
const blogController = require("../Controllers/blogController");
const authController = require("../Controllers/authController");
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

router.route("/")
  .get(blogController.blogs)
  .post(authController.protect, upload.single("image"), blogController.saveBlog);

router.route("/my")
  .get(authController.protect, blogController.userBlogs);

router.route("/:id")
  .get(blogController.blog)
  .put( upload.single("image"),blogController.editBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
