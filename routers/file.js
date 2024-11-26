const express = require("express");
const multer = require("multer");
const router = express.Router();
const db = require("../database/db.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const filename = req.file.originalname;
    const content = req.file.buffer;
    const createdFile = await db.createFile({
      key_ref: req.body.key_ref,
      origin: req.body.origin,
      filename: filename,
      content: content,
    });

    res.status(201).json(createdFile);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors separately
      res.status(400).json({ error: "Invalid data provided" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
router.patch("/:id", upload.single("file"), async (req, res) => {
  try {
    const filename = req.file.originalname;
    const content = req.file.buffer;
    const updatedFile = await db.updateFile({
      id: req.body.id,
      key_ref: req.body.key_ref,
      origin: req.body.origin,
      filename: filename,
      content: content,
    });
    res.status(200).json(updatedFile);
  } catch (error) {
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
    let files;
    if (!Object.keys(req.query).length) {
      // files = await db.fetchAllFiles();
    } else {
      files = await db.getFilesByParams(req.query);
    }

    res.status(200).json(files);
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
router.delete("/:id", async (req, res) => {
  try {
    const deletedFile = await db.deleteFileById(req.params.id);
    res.status(200).json(deletedFile);
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
