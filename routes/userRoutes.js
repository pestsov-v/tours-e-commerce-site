const express = require('express');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  protect,
  updatePassword,
  restrictTo,
} = require('../controllers/authController');
const { createReview } = require('../controllers/reviewController');
const {
  getAllUsers,
  updateMe,
  deleteMe,
} = require('../controllers/userController');
const userRoute = express.Router();

userRoute.post('/signup', signup);
userRoute.post('/login', login);

userRoute.post('/forgotPassword', forgotPassword);
userRoute.patch('/resetPassword/:token', resetPassword);

userRoute.patch('/updateMyPassword', protect, updatePassword);

userRoute.patch('/updateMe', protect, updateMe);
userRoute.delete('/deleteMe', protect, deleteMe);

userRoute.get('/', getAllUsers);

module.exports = userRoute;
