const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
} = require('../controllers/reviewController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.get('/', getAllReviews);
reviewRouter.post(
  '/',
  protect,
  restrictTo('admin'),
  setTourUserIds,
  createReview
);
reviewRouter.patch('/:id', updateReview);
reviewRouter.delete('/:id', deleteReview);

module.exports = reviewRouter;
