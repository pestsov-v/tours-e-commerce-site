const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllReviews,
  createReview,
  deleteReview,
} = require('../controllers/reviewController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.get('/', getAllReviews);
reviewRouter.post('/', protect, restrictTo('admin'), createReview);
reviewRouter.delete('/:id', deleteReview);

module.exports = reviewRouter;
