const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
router.get("/:id", async (req, res) => {
  try {
    const user = await db.getUserById(req.params.id);
    res.status(200).json(user);
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
    let users;
    if (!Object.keys(req.query).length) {
      users = await db.fetchAllUsers();
    } else {
      if (!req.query.name_like) {
        users = await db.getUsersByParams(req.query);
      } else {
        let searchString = req.query.first_name_like;
        delete req.query["first_name_like"];
        users = await db.getUsersBySearchString(searchString, req.query);
      }
    }

    res.status(200).json(users);
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
    const createdUser = await db.createUser(req.body);
    res.status(201).json(createdUser);
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
    const updatedUser = await db.updateUser(req.body);
    res.status(200).json(updatedUser);
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
    const deletedUser = await db.deleteUserById(req.params.id);
    res.status(200).json(deletedUser);
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
