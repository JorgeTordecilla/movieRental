const { Schema, model } = require("mongoose");

const UsersSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

module.exports = model("Users", UsersSchema);
