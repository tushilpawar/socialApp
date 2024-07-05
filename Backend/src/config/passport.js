const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const AppleStrategy = require('passport-apple').Strategy;

const GOOGLE_CLIENT_ID =process.env.GOOGLE_CLIENT_ID 
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

FACEBOOK_APP_ID=process.env.FACEBOOK_APP_ID
FACEBOOK_APP_SECRET=process.env.FACEBOOK_APP_SECRET

const User = require("../models/userModel");
const hashPassword = require("../utils/hashPassword");


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("profile",profile,accessToken);
        let user = await User.findOne({ google_id: profile.id });
        const hashedPassword = await hashPassword(process.env.SOCIAL_APP_PASSWORD);
        console.log("user findOne", user);
        if (user) {
          return done(null, user);
        }
        user = await User.create({
          google_id: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          mobileNumber: profile._json.email,
          password: hashedPassword,
          created_by:profile.name.givenName ? 'google-oauth' : 'self',
          updated_by: profile.name.givenName ? 'google-oauth' : 'self',
        });
        console.log("user>>", user);
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebook_id: profile.id });
        if (user) {
          return done(null, user);
        }
        user = await User.create({
          facebook_id: profile.id,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          password: process.env.SOCIAL_APP_PASSWORD,
          created_by:profile.name.givenName ? profile.name.givenName : 'self',
          updated_by: profile.name.givenName ? profile.name.givenName : 'self',
        });
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

//Apple

// passport.use(new AppleStrategy({
//     clientID: "",
//     teamID: "",
//     callbackURL: "",
//     keyID: "",
//     privateKeyLocation: "",
//     passReqToCallback: true
// }, function(req, accessToken, refreshToken, idToken, profile, cb) {
//     cb(null, idToken);
// }));
