const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const path = require("path");
const User = require("../../models/User");
const fs = require("fs");
const { Auth } = require("@vonage/auth");
const { Vonage } = require("@vonage/server-sdk");
const { Video: VonageVideo } = require("@vonage/video");
/* const credentials = new Auth({
  applicationId: process.env.REACT_APP_VONAGE_APP_ID,


  privateKey: fs.readFileSync(
    path.join(__dirname, process.env.REACT_APP_VONAGE_PRIVATE_KEY_PATH),
    "utf-8"
  ) 
}); */
/* const vonage = new Vonage(credentials); */
const vonage = new VonageVideo({
  applicationId: process.env.REACT_APP_VONAGE_APP_ID,

  privateKey: process.env.REACT_APP_VONAGE_PRIVATE_KEY_PATH,
});

// @route   GET api/video/session
// @desc    Get token after getting sessionid
// @access  Public
let session = null;
router.get(
  "/session",
  /* auth */ async (req, res) => {
    try {
      if (session === null) {
        /*         session = await vonage.video.createSession({ mediaMode: "routed" }); */
        session = await vonage.createSession({ mediaMode: "routed" });
        console.log("SESSION", session);
        console.log("INSIDE IF");
      }
      /*    const token = vonage.video.generateClientToken(session.sessionId); */
      const token = vonage.generateClientToken(session.sessionId);
      console.log("SESSION", session.sessionId);
      console.log("token", token);
      console.log("app_id", process.env.REACT_APP_VONAGE_APP_ID);

      res.status(200).json({
        session_id: session.sessionId,
        token: token,
        app_id: process.env.REACT_APP_VONAGE_APP_ID,
      });
    } catch (error) {
      console.error("Error creating session: ", error);
    }
  }
);

module.exports = router;
