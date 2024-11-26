const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
router.get("/:id", async (req, res) => {
  try {
    const orderProduct = await db.getOrderProductById(req.params.id);
    res.status(200).json(orderProduct);
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
    let orderProducts;
    if (!Object.keys(req.query).length) {
      orderProducts = await db.fetchAllOrderProducts();
    } else {
      
      if (req.query.start_date && req.query.end_date) {
        orderProducts = await db.getOrderProductsByCreatedDates(
          req.query.start_date,
          req.query.end_date
        );
        
      } else {
        orderProducts = await db.getOrderProductsByParams(req.query);
      }
    }

    res.status(200).json(orderProducts);
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
    const createdOrderProduct = await db.createOrderProduct(req.body);
    res.status(201).json(createdOrderProduct);
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
    const updatedOrderProduct = await db.updateOrderProduct(req.body);
    res.status(200).json(updatedOrderProduct);
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
    const deletedOrderProduct = await db.deleteOrderProductById(req.params.id);
    res.status(200).json(deletedOrderProduct);
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
