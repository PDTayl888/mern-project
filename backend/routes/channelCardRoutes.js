const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const ChannelCategory = require("../models/Category");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "CATEGORY MISMATCH" });
    }
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "NOT AUTHORIZED",
      });
    }
    const cards = await ChannelCard.find({ category: req.params.categoryId });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "FAILED TO FETCH" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { channelName, youtubeUrl, description, status } = req.body;

    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "CATEGORY MISMATCH" });
    }
    if (category.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "NOT AUTHORIZED",
      });
    }

    const card = await ChannelCard.create({
      channelName,
      youtubeUrl,
      description,
      status: status || "Subscribed",
      category: req.params.categoryId,
      user: req.user.id,
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ message: "CREATE FAILED" });
  }
});
