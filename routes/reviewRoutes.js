const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(protect);

reviewRouter.get('/', getAllReviews);
reviewRouter.get('/:id', getReview);
reviewRouter.post('/', restrictTo('admin'), setTourUserIds, createReview);
reviewRouter.patch('/:id', restrictTo('user', 'admin'), updateReview);
reviewRouter.delete('/:id', restrictTo('user', 'admin'), deleteReview);

module.exports = reviewRouter;
