exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  console.log("받은 거", username, password);
  if (username === "alstn113") {
    return res.status(409).json({ error: "already exist" });
  }
  return res.json({ data: "dnriri", success: "됐다 민수야" });
};

exports.login = async (req, res, next) => {};

exports.check = async (req, res, next) => {};

exports.logout = async (req, res, next) => {};
