const express = require("express")

const router = express.Router()
const blogController = require("../Controllers/blogController")

router.route("/").get(blogController.blogs).post(blogController.saveBlog)

router.route("/:id")
.get(blogController.blog)
.put(blogController.editBlog)
.delete(blogController.deleteBlog)

module.exports = router