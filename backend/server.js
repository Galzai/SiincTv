/**
 * This is the entry point to our server, we intialize:
 * MongoDb connection
 * Express server
 * Cors
 * sessioneStore
 * socketIo
 * @module Server
 * @category Backend
 */

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/routes");
const MongoStore = require("connect-mongo")(session);
// Socket io stuff
const socketio = require("socket.io");

mongoose.set("useCreateIndex", true);
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
mongoose.connection.on("error", function (err) {
  console.error("MongoDB error: %s", err);
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

// our session store on mogo
const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection });

// set a session for reusability
var expressSession = session({
  secret: "siinctvsecretcode",
  resave: true,
  saveUninitialized: true,
  store: mongoStore,
});

// The secret is used to compute the hash for the session to sign cookies with
app
  .use(expressSession)
  .use(cookieParser("siinctvsecretcode"))
  .use(passport.initialize())
  .use(passport.session());
require("./passportConfigs/passportSetup")(passport);

//-------------------------------------------------------------------------------------------
app.use("/", router);

//Start Server
const server = app.listen(4000, () => {
  console.log("Server Has Started");
});

const io = socketio(server, { cors: { corsInf } });
io.use(function (socket, next) {
  expressSession(socket.request, socket.request.res || {}, next);
});

require("./sockets/sockets").initializeSocket(io);
