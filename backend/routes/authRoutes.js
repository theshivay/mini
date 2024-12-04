const express = require("express");
const { register, login } = require("../controllers/authController");
const { validateUserRegistration } = require("../utils/validate");

const router = express.Router();

router.post("/register", validateUserRegistration, register);
router.post("/login", login);

module.exports = router;
