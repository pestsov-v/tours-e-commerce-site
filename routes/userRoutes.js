const express = require('express');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
} = require('../controllers/authController');
const { getAllUsers } = require('../controllers/userController');
const userRoute = express.Router();

userRoute.post('/signup', signup);
userRoute.post('/login', login);

userRoute.post('/forgotPassword', forgotPassword);
userRoute.post('/resetPassword', resetPassword);

userRoute.get('/', getAllUsers);

module.exports = userRoute;
