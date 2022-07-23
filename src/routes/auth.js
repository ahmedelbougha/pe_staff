const express = require("express");
const router = express.Router();

// auth controller
const authController = require("../controllers/auth");

// routes (all started with /auth but it shows only the sub-routes here)
router.post("/login", authController.login);

module.exports = router;
