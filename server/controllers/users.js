const db = require("../models");
const helper = require("../helpers/serialize");

module.exports.get = async (req, res) => {
  const users = await db.getUsers();
  res.json(users.map((user) => helper.serializeUser(user)));
};

module.exports.patch = async (req, res, next) => {
  try {
    const user = await db.updateUserPermission(req.params.id, req.body);
    res.json({
      ...helper.serializeUser(user),
    });
  } catch (e) {
    next(e);
  }
};

module.exports.delete = async (req, res) => {
  await db.deleteUser(req.params.id);
  res.json({});
};
