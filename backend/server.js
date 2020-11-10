const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(
  "mongodb+srv://siincdb:siincdacat@siinccluster.usjl1.mongodb.net/siincDb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

// checking for connection and schema erros
mongoose.connection.on('error', function(err) {
    console.error('MongoDB error: %s', err);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);

// The secret is used to compute the hash for the session to sign cookies iwth
app.use(
  session({
    secret: "siinctvsecretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("siinctvsecretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------
//TODO: Refactor to to use routes correctly
// Routes
app.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});


// we first try to check if a user with the same username exists, otherwise we allow registration
app.post("/signup", (req, res) => {
    console.log("signup request occured")
  User.findOne({ username: req.body.username }, async function(err, doc){
    if (err){
        console.log("error occured");
    }
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // encrypt the password

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.get("/user", (req, res) => {
  console.log(req.user);
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});