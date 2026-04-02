const express = require("express");
//import ChannelCard from './../../frontend/frontend/src/components/ChannelCard';
const router = express.Router({ mergeParams: true });
const Category = require("../models/Category");
const ChannelCard = require("../models/ChannelCard");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
});

router.post("/", authMiddleware, async (req, res) => {
});

router.put("/:id", authMiddleware, async (req, res) => {
});

router.delete("/:id", authMiddleware, async (req, res) => {
});

module.exports = router;
