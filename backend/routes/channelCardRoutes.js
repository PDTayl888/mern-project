const express = require("express");
import ChannelCard from './../../frontend/frontend/src/components/ChannelCard';
const router = express.Router({ mergeParams: true });
const Category = require("../models/Category");
const ChannelCard = require("../models/ChannelCard");
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

router.put('/:id', authMiddleWare, async (req, res) => {
  try {
    const card = await ChannelCard.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: 'CARD NOT FOUND' });
    }
    if (card.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'UPDATE NOT AUTHORIZED' });
    }
    const updatedCard = await ChannelCard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: 'UPDATE FAILED' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
const card = await ChannelCard.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: 'CARD NOT FOUND' });
    }

    if (card.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'NOT AUTHORIZED' });
    }
    await card.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'SUCCESSFUL CARD DELETE' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete card' });
  }
});


module.exports = router;