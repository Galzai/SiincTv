var express = require('express')
var router = express.Router()

// our controllers
var userController = require('../controllers/userController')

// POST request to sign in
router.post('/signin',userController.user_login);

// POST request to log out
router.post('/signout',userController.logout); 

// POST request to sign up
router.post('/signup',userController.user_signup);

// GET request to get currently signed in user
router.get('/user',userController.get_user);

// POST request to check if given username exists
router.post('/check_username',userController.check_username_exists);



module.exports = router;
