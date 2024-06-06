const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        type: String,
      },
    ],
    virtual_tour: {
      type: Boolean,
      default: false,
    },
    floor_plan: {
      type: Boolean,
      default: false,
    },
    dollhouse: {
      type: Boolean,
      default: false,
    },
    pack: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Tour = mongoose.model("tour", TourSchema);
