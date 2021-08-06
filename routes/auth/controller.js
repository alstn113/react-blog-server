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
    const token = user.generateToken();
    return res.cookie("access_token", token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }).json(user.serialize());
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = user.generateToken();
    return res.cookie("access_token", token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true }).json(user.serialize());
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.check = async (req, res, next) => {
  const { user } = req.app.locals;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return res.json(user);
};

exports.logout = async (req, res, next) => {
  return res.status(204).clearCookie("access_token").json({ success: true });
};
