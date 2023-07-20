const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const authenticateToken = require("../authMiddleware");

// Create and save a new Category
router.post("/category", authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: "category added", category: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// fetch all categories
router.get("/category", authenticateToken, async (req, res) => {
  try {
    const category = await Category.find().select("-__v");
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
