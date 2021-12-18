const express = require('express');
const { signup, login } = require('../controllers/authController');
const { getAllUsers } = require('../controllers/userController');
const userRoute = express.Router();

userRoute.post('/signup', signup);
userRoute.post('/login', login);

userRoute.get('/', getAllUsers);

module.exports = userRoute;
