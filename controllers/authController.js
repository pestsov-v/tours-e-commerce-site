const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const signToken = (id) => {
  return (token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }));
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Неверный email или пароль', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return next(new AppError('Неверный email или пароль', 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.query.authorization && req.query.authorization.startsWith('Bearer')) {
    token = req.query.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'Вы не залогинились! Пожалуйста ввойдите в вашу учётную запись',
        401
      )
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('Токен, который Вам принадлежит, больше не существует.', 401)
    );
  }

  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'Пользователь недавно изменил пароль. Пожалуйста ввойдите ещё раз',
        401
      )
    );
  }

  req.user = freshUser;

  next();
});
