const Joi = require("joi");
const User = require("../../schemas/user");

exports.register = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error);
  }
  const { username, password } = req.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      return res.status(409).json({ error: "Conflict" });
    }
    const user = new User({ username });
    await user.setPassword(password);
    await user.save();
    return res.json(user.serialize());
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {};

exports.check = async (req, res, next) => {};

exports.logout = async (req, res, next) => {};
