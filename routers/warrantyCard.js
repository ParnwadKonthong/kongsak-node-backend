const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
router.get("/:id", async (req, res) => {
  try {
    const warrantyCard = await db.getWarrantyCardById(req.params.id);
    res.status(200).json(warrantyCard);
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
    let warrantyCards;
    if (!Object.keys(req.query).length) {
      warrantyCards = await db.fetchAllWarrantyCards();
    } else {
      if (!req.query.created_by_like) {
        warrantyCards = await db.getWarrantyCardsByParams(req.query);
      } else {
        let searchString = req.query.created_by_like;
        delete req.query["created_by_like"];
        warrantyCards = await db.getWarrantyCardsBySearchString(
          searchString,
          req.query
        );
      }
    }

    res.status(200).json(warrantyCards);
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
    const createdWarrantyCard = await db.createWarrantyCard(req.body);
    res.status(201).json(createdWarrantyCard);
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
    const updatedWarrantyCard = await db.updateWarrantyCard(req.body);
    res.status(200).json(updatedWarrantyCard);
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
    const deletedWarrantyCard = await db.deleteWarrantyCardById(req.params.id);
    res.status(200).json(deletedWarrantyCard);
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
