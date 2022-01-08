const express = require('express');
const { protect, isLoggedIn } = require('../controllers/authController');
const { createBookingCheckout } = require('../controllers/bookingController');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  updateUserData,
  getMyTours,
} = require('../controllers/viewsController');
const viewRoute = express.Router();

viewRoute.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' blob:http://localhost:4000/*"
  );
  next();
});

viewRoute.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js"
  );
  next();
});

viewRoute.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "script-src * 'self' data: https:; worker-src 'self' 'unsafe-inline' * blob:;"
  );
  next();
});

viewRoute.get('/login', isLoggedIn, getLoginForm);
viewRoute.get('/', createBookingCheckout, isLoggedIn, getOverview);
viewRoute.get('/my-tours', protect, getMyTours);
viewRoute.get('/tour/:slug', isLoggedIn, getTour);
viewRoute.get('/me', protect, getAccount);

viewRoute.post('/submit-user-data', protect, updateUserData);

module.exports = viewRoute;
