const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Property = require("../../models/Property");
const Tour = require("../../models/Tour");

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  })
);

// @route   POST api/tour
// @desc    Create Tour
// @access  Private

router.post(
  "/",

  async (req, res) => {
    const {
      name,
      address,
      country,
      city,
      images,
      virtual_tour,
      floor_plan,
      dollhouse,
      pack,
    } = req.body;

    try {
      let tour = new Tour({
        name,
        address,
        country,
        city,
        images,
        virtual_tour,
        floor_plan,
        dollhouse,
        pack,
      });
      await tour.save();
      res.status(200).json(tour);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/tour
// @desc    Get All Tour
// @access  Private

router.get(
  "/",

  async (req, res) => {
    try {
      let tours = await Tour.find();

      res.status(200).json(tours);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/tour/:id
// @desc    Get single Tour by id
// @access  Private
router.get(
  "/:id",

  async (req, res) => {
    try {
      let id = req.params.id;

      let tour = await Tour.findById({ _id: id });

      res.status(200).json(tour);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/tour/:id
// @desc    Saves images to Tour
// @access  Private
router.put(
  "/:id",

  async (req, res) => {
    try {
      const { images } = req.body;
      console.log(images);
      let id = req.params.id;
      let tour = await Tour.findById({ _id: id });
      tour.images.push(...images);
      await tour.save();
      res.status(200).json(tour);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/tour/:id
// @desc    Delete image from Tour
// @access  Private
router.delete(
  "/:id",

  async (req, res) => {
    try {
      const { image } = req.body;
      console.log(image);
      let id = req.params.id;
      let tour = await Tour.findById({ _id: id });
      tour.images = tour.images.filter((img) => img !== image);
      await tour.save();
      res.status(200).json(tour);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/tour/archive/:id
// @desc    Archive Tour
// @access  Private
router.put(
  "/archive/:id",

  async (req, res) => {
    try {
      let id = req.params.id;
      let tour = await Tour.findById({ _id: id });
      tour.archived = !tour.archived;
      await tour.save();
      res.status(200).json(tour);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/tour/visited/:id
// @desc    Add Visits
// @access  Private
router.put(
  "/visited/:id",

  async (req, res) => {
    try {
      let id = req.params.id;
      let tour = await Tour.findById({ _id: id });
      tour.visited.push({ date: new Date() });
      await tour.save();
      res.status(200).json(tour);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/tour/videocall/:id
// @desc    Add VideoCall
// @access  Private
router.put(
  "/videocall/:id",

  async (req, res) => {
    try {
      let id = req.params.id;
      let { timeDuration } = req.body;
      let tour = await Tour.findById({ _id: id });
      tour.videoCalls.push({ timeDuration, date: new Date() });
      await tour.save();
      res.status(200).json(tour);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
