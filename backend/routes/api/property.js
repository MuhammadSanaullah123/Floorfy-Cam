const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Property = require("../../models/Property");

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

// @route   POST api/property
// @desc    Create Property
// @access  Private

router.post(
  "/:id",

  async (req, res) => {
    const {
      user_id,
      property_title,
      property_type,
      ad_type,
      area_unit,
      surface,
      coin,
      price,
      description,
      external_ID,
      agent,
      showDetails,
      enableWatermark,
      hideExactLocation,
      address,
      location,
    } = req.body;

    try {
      let tour_id = req.params.id;

      let property = await Property.findOne({ tour_id: tour_id });
      if (property) {
        property.property_title = property_title;
        property.property_type = property_type;
        property.ad_type = ad_type;
        property.area_unit = area_unit;
        property.surface = surface;
        property.coin = coin;
        property.price = price;
        property.description = description;
        property.external_ID = external_ID;
        property.agent = agent;
        property.showDetails = showDetails;
        property.enableWatermark = enableWatermark;
        property.hideExactLocation = hideExactLocation;
        property.address = address;
        property.location = location;
      } else {
        property = new Property({
          tour_id,
          user: user_id,
          property_title,
          property_type,
          ad_type,
          area_unit,
          surface,
          coin,
          price,
          description,
          external_ID,
          agent,
          showDetails,
          enableWatermark,
          hideExactLocation,
          address,
          location,
        });
      }

      await property.save();
      res.status(200).json(property);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/property/:id
// @desc    Get property Tour by tour id
// @access  Private
router.get(
  "/:id",

  async (req, res) => {
    let id = req.params.id;
    try {
      console.log("GET");
      let property = await Property.find({ tour_id: id });

      res.status(200).json(property[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
