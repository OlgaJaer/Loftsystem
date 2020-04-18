//const User = require('../models/userModel')
const helper = require("../helpers/serialize");
const tokens = require("../auth/tokens");
const db = require("../models");
require("dotenv").config();
const secret = process.env.SECRET;

module.exports.registration = async (req, res) => {
  const { username } = req.body;
  console.log(req.body);
  const user = await db.getUserByName(username);
  if (user) {
    return res.status(400).json({code: 400,message: 'Пользователь с таким именем существует'});
  }
  try {
    const newUser = await db.createUser(req.body);
    const token = await tokens.createTokens(newUser, secret);
    res.json({
      ...helper.serializeUser(newUser),
      ...token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }

};

