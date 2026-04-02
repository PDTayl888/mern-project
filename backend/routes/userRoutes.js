const express = require("express");
const router = express.Router();
const passport = require("passport");
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
  githubAuthCallback,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getUserProfile);

router.get("/auth/github", passport.authenticate("github", { session: false }));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=github_failed`,
  }),
  githubAuthCallback,
);

module.exports = router;
