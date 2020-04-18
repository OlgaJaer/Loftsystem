const express = require("express");
const router = express.Router();

const ctrAuth = require("../controllers/auth");
const ctrLogin = require("../controllers/login");
const ctrProfile = require("../controllers/profile");
const ctrUsers = require("../controllers/users");
const ctrNews = require("../controllers/news");

const isAuth = require("../auth/auth")

router.post("/api/registration", ctrAuth.registration);
router.post("/api/login", ctrLogin.login);
router.post('/api/refresh-token', ctrLogin.refreshtoken);

router.get("/api/profile", isAuth, ctrProfile.get);
router.patch("/api/profile", isAuth, ctrProfile.patch);

router.delete("/api/users/:id", isAuth, ctrUsers.delete);
router.patch("/api/users/:id/permission", isAuth, ctrUsers.patch);
router.get("/api/users", isAuth, ctrUsers.get); 

router.post("/api/news", isAuth, ctrNews.post);
router.delete("/api/news/:id", isAuth, ctrNews.delete);
router.get("/api/news", isAuth, ctrNews.get);
router.patch("/api/news/:id", isAuth, ctrNews.patch);


module.exports = router;