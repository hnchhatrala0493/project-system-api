const express = require("express");
const routes = express.Router();
const LoginController = require("../controllers/Login.controller");
const isAuth = require("../middleware/auth");

routes.post("/login-with-email", LoginController.LoginWithEmail);
routes.post("/register-user", LoginController.Register);
// routes.post("/forgot-password", LoginController.ForgotPasswordLink);
// routes.post("/reset-password", LoginController.ResetPasswordLink);

module.exports = routes;
