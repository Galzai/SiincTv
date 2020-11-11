const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/routes");
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
require("./passport/passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------
//TODO: Refactor to to use routes correctly
// Routes
app.use('/',router);
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});