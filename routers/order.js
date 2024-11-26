const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
router.get("/:id", async (req, res) => {
  try {
    const order = await db.getOrderById(req.params.id);
    res.status(200).json(order);
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
    let orders;
    if (!Object.keys(req.query).length) {
      orders = await db.fetchAllOrders();
    } else {
      if (!req.query.created_by_like) {
        orders = await db.getOrdersByParams(req.query);
      } else {
        let searchString = req.query.created_by_like;
        delete req.query["created_by_like"];
        orders = await db.getOrdersBySearchString(searchString, req.query);
      }
    }

    res.status(200).json(orders);
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
    const createdOrder = await db.createOrder(req.body);
    res.status(201).json(createdOrder);
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
    const updatedOrder = await db.updateOrder(req.body);
    res.status(200).json(updatedOrder);
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
    const deletedOrder = await db.deleteOrderById(req.params.id);
    res.status(200).json(deletedOrder);
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
