const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
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
