const express = require("express");
const router = express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const response = await axios.post(
      "https://www.googleapis.com/oauth2/v4/token",
      null,
      {
        params: {
          code: req.query.code,
          client_id: req.query.client_id,
          client_secret: req.query.client_secret,
          redirect_uri: req.query.redirect_uri,
          grant_type: req.query.grant_type,
        },
      }
    );
    const userInfo = jwt.decode(response.data.id_token);
    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
module.exports = router;
