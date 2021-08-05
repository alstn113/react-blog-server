const express = require("express");
const post = express.Router();
const controller = require("./controller");

/**
 *   @description /api/post
 */

post.get("/", controller.list);
post.post("/", controller.write);
post.get("/:id", controller.read);
post.patch("/:id", controller.update);
post.delete("/:id", controller.remove);

module.exports = post;
