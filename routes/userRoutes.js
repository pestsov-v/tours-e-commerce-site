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
  updateUser,
  getMe,
  getUser,
} = require('../controllers/userController');
const userRoute = express.Router();

userRoute.get('/', getAllUsers);
userRoute.patch('/:id', updateUser);
userRoute.delete('/:id', deleteUser);

userRoute.post('/signup', signup);
userRoute.post('/login', login);

userRoute.get('/me', protect, getMe, getUser);
userRoute.patch('/updateMe', protect, updateMe);
userRoute.delete('/deleteMe', protect, deleteMe);

userRoute.post('/forgotPassword', forgotPassword);
userRoute.patch('/resetPassword/:token', resetPassword);
userRoute.patch('/updateMyPassword', protect, updatePassword);

module.exports = userRoute;
