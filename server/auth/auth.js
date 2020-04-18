const passport = require("passport");

const isAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user || err) {
      res.status(401).json({
        code: 401,
        message: "Unauthorized",
      });
    } else {
      next();
    }
  })(req, res, next);
};

module.exports = isAuth