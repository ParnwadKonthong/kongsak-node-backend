const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
router.get("/:id", async (req, res) => {
  try {
    const shippingAddress = await db.getShippingAddressById(req.params.id);
    res.status(200).json(shippingAddress);
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
router.get("/", async (req, res) => {
  try {
    let shippingAddresses;
    if (!Object.keys(req.query).length) {
      shippingAddresses = await db.fetchAllShippingAddresses();
    } else {
      shippingAddresses = await db.getShippingAddressesByParams(req.query);
    }

    res.status(200).json(shippingAddresses);
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
router.post("/", async (req, res) => {
  try {
    const createdShippingAddress = await db.createShippingAddress(req.body);
    res.status(201).json(createdShippingAddress);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const updatedShippingAddress = await db.updateShippingAddress(req.body);
    res.status(200).json(updatedShippingAddress);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedShippingAddress = await db.deleteShippingAddressById(
      req.params.id
    );
    res.status(200).json(deletedShippingAddress);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
module.exports = router;
