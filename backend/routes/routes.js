var express = require('express')
var router = express.Router()

// our controllers
var userController = require('../controllers/userController')

// POST request to sign in
router.post('/signin',userController.user_login);

// POST request to sign up
router.post('/signup',userController.user_signup);

// GET request to get currently signed in user
router.get('/user',userController.get_user);

module.exports = router;
