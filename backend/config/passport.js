const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    try {
        let user = await User.findOne({ githubId: profile.id });
      if (user) return done(null, user);

      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      const githubUsername = profile.username || profile.displayName || `user_${profile.id}`;
      if (!email) {
          return done(new Error("No email found on GitHub profile"), null);
      }

      user = await User.findOne({ email });
      if (user) {
        user.githubId = profile.id;
        if (!user.username) {
          user.username = githubUsername;
        }
        await user.save();
        return done(null, user);
      }

      user = await User.create({
        email: email,
        githubId: profile.id
      });
      return done(null, user);

      } catch (error) {
      return done(error, false);
    }
  }
));

module.exports = passport;