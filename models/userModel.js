const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Пожалуйста повторите Ваш пароль'],
    minlength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Пароли не совпадают',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
