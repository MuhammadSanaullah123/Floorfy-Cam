const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    tour_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    property_title: {
      type: String,
    },
    property_type: {
      type: String,
    },
    ad_type: {
      type: String,
    },
    area_unit: {
      type: String,
    },
    surface: {
      type: String,
    },
    coin: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    external_ID: {
      type: String,
    },
    agent: {
      type: String,
    },
    showDetails: {
      type: Boolean,
      default: true,
    },
    enableWatermark: {
      type: Boolean,
      default: true,
    },
    hideExactLocation: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    location: {
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Property = mongoose.model("property", PropertySchema);
