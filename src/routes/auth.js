const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController')

const userSchema = require("../validations/userValidation");
const loginSchema = require("../validations/loginValidation");


router.post("/register", userSchema, UserController.create)
router.post("/login", loginSchema, UserController.login);

module.exports = router;