const express = require('express');
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  protect,
  updatePassword,
} = require('../controllers/authController');
const {
  getAllUsers,
  updateMe,
  deleteMe,
  deleteUser,
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

userRoute.delete('/:id', deleteUser);

module.exports = userRoute;
