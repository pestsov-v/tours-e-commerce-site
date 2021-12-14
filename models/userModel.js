const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Пожалуйста введите Ваше имя'],
  },
  email: {
    type: String,
    required: [true, 'Пожалуйста введите Ваш email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Пожалуйста введите правильный email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Пожалуйста введите Ваш пароль'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Пожалуйста повторите Ваш пароль'],
    minlength: 8,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
