const express = require("express");
const auth = express.Router();
const controller = require("./controller");

/**
 *   @description /api/auth
 */

auth.post("/register", controller.register);
auth.post("/login", controller.login);
auth.get("/check", controller.check);
auth.post("/logout", controller.logout);

module.exports = auth;
