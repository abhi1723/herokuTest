const express = require('express');
const authController = require('./../Controller/authController');
const router = express.Router();
router.post('/signup',authController.signUp);
router.get('/login',authController.login);
module.exports = router;