const express = require('express');
const { protect } = require('../controllers/authController');
const { getCheckoutSession } = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.get('/checkout-session/:tourId', protect, getCheckoutSession);

module.exports = bookingRouter;
