const express = require("express");
const post = express.Router();
const controller = require("./controller");
const { checkLoggedIn } = require("../../middlewares/authenticate");

/**
 *   @description /api/post
 */

post.get("/", controller.list);
post.post("/", checkLoggedIn, controller.write);

post.get("/:id", controller.getPostById, controller.read);
post.patch("/:id", checkLoggedIn, controller.getPostById, controller.checkOwnPost, controller.update);
post.delete("/:id", checkLoggedIn, controller.getPostById, controller.checkOwnPost, controller.remove);

module.exports = post;
