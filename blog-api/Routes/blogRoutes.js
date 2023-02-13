const express = require("express")

const router = express.Router()
const blogController = require("../Controllers/blogController")
const authController = require("../Controllers/authController");


router.route("/").get(blogController.blogs).post(authController.protect, blogController.saveBlog)
router.route("/my").get(authController.protect,blogController.userBlogs)
router.route("/:id")
.get(blogController.blog)
.put(blogController.editBlog)
.delete(blogController.deleteBlog)

module.exports = router