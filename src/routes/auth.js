const express = require("express");
const router = express.Router();

// require authentication controller
const authController = require("../controllers/auth");

router.post("/login", authController.login);
module.exports = router;
