const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/routes");

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

//--------------------------Middleware--------------------------------------------------------- \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsInf = cors({
  origin: "http://localhost:3000", // <-- location of the react app were connecting to
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
});
app.use(corsInf);


// set a session for reusability
var expressSession =   session({
  secret: "siinctvsecretcode",
  resave: true,
  saveUninitialized: true,
})
// The secret is used to compute the hash for the session to sign cookies iwth
app.use(expressSession)
.use(cookieParser("siinctvsecretcode"))
.use(passport.initialize())
.use(passport.session());
require("./passportConfigs/passportSetup")(passport);

//-------------------------------------------------------------------------------------------
app.use('/',router);

//Start Server
const server = app.listen(4000, () => {
  console.log("Server Has Started");});

// pass the session and server to socketIo
require('./sockets/sockets').initializeSocket(server, expressSession, corsInf);




