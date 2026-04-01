const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const passport = require("passport");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "USER EXISTS" });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "USER REGISTERED", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "SERVER ERROR", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "EMAIL INVALID" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "PASSWORD INVALID" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.get(
  "/auth/github",
  passport.authenticate("github", { session: false }),
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=github_failed`,
  }),
  (req, res) => {
    const token = signToken(req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  },
);

module.exports = router;
