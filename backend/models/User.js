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
    promoCode: {
      type: String,
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

    basic1: {
      type: Boolean,
      default: false,
    },
    basic2: {
      type: Boolean,
      default: false,
    },
    basic3: {
      type: Boolean,
      default: false,
    },
    basic4: {
      type: Boolean,
      default: false,
    },
    basic5: {
      type: Boolean,
      default: false,
    },
    basic6: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", UserSchema);
