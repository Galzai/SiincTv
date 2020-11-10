
var app = require('express');
var router = express.Router();

//TODO:Move route functions to different file
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

module.exports = router;