const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const now = new Date();

const userSchema = new Schema({
  email: {
    type: String,
    default: null,
    required: true,
  },
  first_name: {
    type: String,
    default: null,
    required: true,
  },
  last_name: {
    type: String,
    default: null,
    required: true,
  },
  // telephone: {
  //   type: String,
  //   default: null,
  // },
  role: {
    type: String,
    default: null,
    required: true,
  },
  password: {
    type: String,
    default: null,
  },
  login_method: {
    type: String,
    default: null,
    required: true,
  },
  is_active: { type: Boolean, default: null, require: true },
  created_at: {
    type: String,
    default: new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString(),
  },
  updated_at: { type: String, default: null },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
