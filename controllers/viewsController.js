const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppErorr = require('../utils/AppError');
const User = require('../models/userModel');

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'Все туры',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviews rating user',
  });

  if (!tour) {
    return next(new AppErorr('Такой страницы не существует', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name}`,
    tour,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Профиль',
  });
});

exports.getAccount = (req, res, next) => {
  res.status(200).render('account', {
    title: 'Ваш аккаунт',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render('account', {
    title: 'Профиль',
    user: updatedUser,
  });
});
