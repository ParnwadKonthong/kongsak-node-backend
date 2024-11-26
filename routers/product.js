const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
router.get("/:id", async (req, res) => {
  try {
    const product = await db.getProductById(req.params.id);
    res.status(200).json(product);
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
    let products;
    if (!Object.keys(req.query).length) {
      products = await db.fetchAllProducts();
    } else {
      if (!req.query.name_like) {
        products = await db.getProductsByParams(req.query);
      } else {
        let searchString = req.query.name_like;
        delete req.query["name_like"];
        products = await db.getProductsBySearchString(searchString, req.query);
      }
    }

    res.status(200).json(products);
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
    const createdProduct = await db.createProduct(req.body);
    res.status(201).json(createdProduct);
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
    const updatedProduct = await db.updateProduct(req.body);
    res.status(200).json(updatedProduct);
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
    const deletedProduct = await db.deleteProductById(req.params.id);
    res.status(200).json(deletedProduct);
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
