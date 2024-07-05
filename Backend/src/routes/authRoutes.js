const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};


// google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session:false,
    scope: ["profile", "email"],
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log("ressss",req.user);
    const token = generateToken(req.user);
    res.redirect(`/auth?token=${token}`);
  }
);

// facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`/auth?token=${token}`);
  }
);

// apple 

router.get("/apple", passport.authenticate('apple'));

router.post("/auth", function(req, res, next) {
  passport.authenticate('apple', function(err, user, info) {
      if (err) {
          if (err == "AuthorizationError") {
              res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
              <a href=\"/login\">Sign in with Apple</a>");
          } else if (err == "TokenError") {
              res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
              <a href=\"/login\">Sign in with Apple</a>");
          } else {
              res.send(err);
          }
      } else {
          if (req.body.user) {
              // Get the profile info (name and email) if the person is registering
              res.json({
                  user: req.body.user,
                  idToken: user
              });
          } else {
              res.json(user);
          }			
      }
  })(req, res, next);
});

module.exports = router;
