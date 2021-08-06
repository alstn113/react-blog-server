const Post = require("../../schemas/post");
const mongoose = require("mongoose");
const Joi = require("joi");

exports.write = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error);
  }
  const { title, body, tags } = req.body;
  try {
    const post = await Post.create({
      title,
      body,
      tags,
    });
    return res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.list = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    return res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.read = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.find({ _id: id });
    if (!post) {
      return res.status(404).json({ error: "Not Found" });
    }
    return res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Post.remove({ _id: id });
    return res.status(204).json({ success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
exports.update = async (req, res, next) => {
  const { id } = req.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error);
  }
  try {
    const post = await Post.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ error: "Not Found" });
    }
    return res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.checkObjectId = (req, res, next) => {
  const { ObjectId } = mongoose.Types;
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Bad Request" });
  }
  return next();
};

exports.list = async (req, res, next) => {
  const page = parseInt(req.query.page || "1", 10);
  if (page < 1) {
    return res.status(400).json({ error: "Not Found" });
  }
  try {
    const posts = await Post.find({})
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean();
    const postCount = await Post.countDocuments();
    return res
      .set("Last-Page", Math.ceil(postCount / 10))
      .json(posts.map((post) => ({ ...post, body: post.body.length < 100 ? post.body : `${post.body.slice(0, 200)}...` })));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
