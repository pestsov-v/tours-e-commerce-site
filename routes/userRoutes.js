const express = require('express');
const { signup } = require('../controllers/authController');
const userRoute = express.Router();

userRoute.post('/signup', signup);

module.exports = userRoute;
