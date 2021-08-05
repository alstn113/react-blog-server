const Post = require("../../schemas/post");

exports.write = async (req, res, next) => {
  try {
    const { title, body, tags } = req.body;
    await Post.create({
      title,
      body,
      tags,
    });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.list = async (req, res, next) => {};
exports.read = async (req, res, next) => {};
exports.remove = async (req, res, next) => {};
exports.update = async (req, res, next) => {};
