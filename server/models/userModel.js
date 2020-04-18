const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  firstName: { type: String },
  middleName: { type: String },
  surName: { type: String },
  image: { type: String },
  userName: {
    type: String,
    required: [true, 'username required'],
    unique: true,
  },
  permission: {
    chat: {
      C: { type: Boolean, default: true },
      R: { type: Boolean, default: true },
      U: { type: Boolean, default: true },
      D: { type: Boolean, default: true },
    },
    news: {
      C: { type: Boolean, default: true },
      R: { type: Boolean, default: true },
      U: { type: Boolean, default: true },
      D: { type: Boolean, default: true },
    },
    settings: {
      C: { type: Boolean, default: true },
      R: { type: Boolean, default: true },
      U: { type: Boolean, default: true },
      D: { type: Boolean, default: true },
    },
  },
  hash: {
    type: String,
    required: [true, 'Password required'],
  },
});

// userSchema.methods.setPassword = function(pswd) {
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(pswd, salt);
//   this.password = hash;
// };
userSchema.methods.setPassword = function (password) {
  this.hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash)
}

//module.exports = model("User", userSchema);
const User = model('user', userSchema)

module.exports = User
