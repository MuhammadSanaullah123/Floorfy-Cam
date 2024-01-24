const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
    },
    contact_name: {
      type: String,
    },
    phone: {
      type: String,
    },
    web: {
      type: String,
    },
    language: {
      type: String,
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
    role: {
      type: String,
      default: "user",
    },
    coin: {
      type: String,
    },
    area_unit: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", UserSchema);
