const express = require("express");
const passport = require("passport");
const session = require('express-session');
const cors = require("cors");
const sequelize = require('./config/database');
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");


require("./config/passport");
require("dotenv").config();

const app = express();
app.use(cors());
app.set('view engine', 'ejs')
app.use(express.json());

app.use(
  session({
    secret: "socialApp",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

app.get('/auth', (req, res) => {
  res.send('User is created');
});
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // Set to 'true' if you want to drop and recreate tables on every sync
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to synchronize the database:', error);
  });



const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


