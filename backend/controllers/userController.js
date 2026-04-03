const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isUser = await User.findOne({ email });

    if (isUser) {
      return res.status(400).json({ message: "USER EXISTS" });
    }

    const user = await User.create({ username, email, password });
    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "SERVER ERROR", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "EMAIL AND PASSWORD REQUIRED" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "EMAIL INVALID" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "PASSWORD INVALID" });
    }

    const token = signToken(user._id);
    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "USER NOT FOUND" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
};

const githubAuthCallback = (req, res) => {
  const token = signToken(req.user._id);
  res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  githubAuthCallback,
};
