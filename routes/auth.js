const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { ROUTES } = require("../constants/routes");
// Signup
router.post(ROUTES.AUTH.REGISTER, authController.register)

// Login
router.post(ROUTES.AUTH.LOGIN, authController.login)

module.exports = router;