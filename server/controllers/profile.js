const helper = require("../helpers/serialize");
const tokens = require("../auth/tokens");
const db = require("../models");
//const formidable = require("formidable");
//const fs = require("fs").promises;
//const path = require("path");
require("dotenv").config();
const secret = process.env.SECRET;

const validation = (files) => {
  if (files.avatar.name === "" || files.avatar.size === 0) {
    return { status: "Не загружена картинка!", err: true };
  }
  return { status: "Ok", err: false };
};

module.exports.get = async function (req, res) {
  const token = req.headers["authorization"];
  const user = await tokens.getUserByToken(token, db, secret);
  res.json({
    ...helper.serializeUser(user),
  });
};

module.exports.patch = async function (req, res, next) {
  // const token = req.headers["authorization"];
  // let form = new formidable.IncomingForm();
  // let upload = path.join("./build", "upload");
  // form.uploadDir = path.join(process.cwd(), upload);
  // form.parse(req, async function (err, fields, files) {
  //   if (err) {
  //     return next(err);
  //   }
  //   let userPatch = {
  //     firstName: fields.firstName,
  //     middleName: fields.middleName,
  //     surName: fields.surName,
  //     oldPassword: fields.oldPassword,
  //     newPassword: fields.newPassword
  //   };
  //   if (files.avatar) {
  //     const valid = validation(files);
  //     if (valid.err) {
  //       await fs.unlink(files.photo.path);
  //       res.status(400).json({
  //         code: 400,
  //         message: "Файл не может быть загружен",
  //       });
  //     }
  //     const fileName = path.join(upload, files.avatar.name);
  //     try {
  //       await fs.rename(files.avatar.path, fileName);
  //     } catch (error) {
  //       if (error) {
  //         console.error(error.message);
  //         return;
  //       }
  //     }

  //     let startSign = fileName.indexOf("/");
  //     if (!startSign) {
  //       startSign = fileName.indexOf("\\");
  //     }
  //     let dir = fileName.substr(startSign);
  //     userPatch.image = dir;
  //   }

  //   const user = await db.updateUserProfile(
  //     userPatch,
  //     await tokens.getUserIdFromToken(token, secret)
  //   );
  //   res.json({
  //     ...helper.serializeUser(user),
  //   });
  // });
};
