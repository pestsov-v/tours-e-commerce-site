const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  deleteBooking,
  updateBooking,
  getBooking,
} = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.get('/checkout-session/:tourId', protect, getCheckoutSession);

bookingRouter.use(protect);

bookingRouter.use(restrictTo('admin', 'lead-guide'));
bookingRouter.get('/', getAllBookings);
bookingRouter.post('/', createBooking);
bookingRouter.get('/:id', getBooking);
bookingRouter.patch('/:id', updateBooking);
bookingRouter.delete('/:id', deleteBooking);

module.exports = bookingRouter;
