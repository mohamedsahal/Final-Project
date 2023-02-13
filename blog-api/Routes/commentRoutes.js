const express = require("express")

const router = express.Router()
const commentRoutes = require("../Controllers/commentController")
const authController = require("../Controllers/authController");

router.route("/").post(authController.protect,commentRoutes.saveComment)

router.route("/:id").get(commentRoutes.comments).put(commentRoutes.editComment).delete(commentRoutes.deleteComment)

module.exports = router