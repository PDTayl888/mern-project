const express = require("express");
const router = express.Router({ mergeParams: true });
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  getCards,
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/channelCardController");

router.get("/", authMiddleware, getCards);
router.post("/", authMiddleware, createCard);

router.put("/:id", authMiddleware, updateCard);
router.delete("/:id", authMiddleware, deleteCard);

module.exports = router;
