const express = require("express");
const routes = express.Router();
const isAuth = require("../middleware/auth");
const UserController = require("../controllers/User.controller");

routes.post("/profile-update", isAuth, UserController.ProfileUpdate);

module.exports = routes;
