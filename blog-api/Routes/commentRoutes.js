const express = require("express")

const router = express.Router()
const commentRoutes = require("../Controllers/commentController")

router.route("/").post(commentRoutes.saveComment).get(commentRoutes.comments)

router.route("/:id").put(commentRoutes.editComment).delete(commentRoutes.deleteComment)

module.exports = router