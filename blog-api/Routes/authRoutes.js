const express = require("express")

const router = express.Router()
const authController = require("../Controllers/authController")

router.route("/login").post(authController.login)
router.route("/signup").post(authController.signUp)
router.route("/signup/").put(authController.protect, authController.profile);
router.route("/change").put(authController.protect, authController.password);


module.exports = router