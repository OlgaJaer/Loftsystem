const helper = require("../helpers/serialize");
const tokens = require("../auth/tokens");
const db = require("../models");
require("dotenv").config();
const secret = process.env.SECRET;
const passport = require("passport");

module.exports.login = async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(400)
          .json({ code: 400, message: "Invalid login or password" });
      }
      if (user) {
        const token = await tokens.createTokens(user, secret);
        console.log(token);
        res.json({
          ...helper.serializeUser(user),
          ...token,
        });
      }
    }
  )(req, res, next);
};

module.exports.refreshtoken = async function (req, res) {
  const refreshToken = req.headers["authorization"];
  const data = await tokens.refreshTokens(refreshToken, db.getUserById, secret);
  res.json({ ...data });
};
