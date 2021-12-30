const express = require('express');
const reviewRouter = require('../routes/reviewRoutes');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
  getMonthlyPlan,
  aliasTopTours,
  getToursWithin,
  getDistances,
} = require('../controllers/tourController');

const tourRoute = express.Router();

tourRoute.use('/:tourId/reviews', reviewRouter);

tourRoute.get('/stats', getTourStats);
tourRoute.get(
  '/monthly-plan/:year',
  protect,
  restrictTo('admin', 'lead-guide'),
  getMonthlyPlan
);
tourRoute.get('/top-5-cheap', aliasTopTours, getAllTours);

tourRoute.get(
  '/tours-within/:distance/center/:latlng/unit/:unit',
  getToursWithin
);

tourRoute.get('/distances/:latlng/unit/:unit', getDistances);

tourRoute.get('/', getAllTours);
tourRoute.post('/', protect, restrictTo('admin', 'lead-guide'), createTour);

tourRoute.get('/:id', getTour);
tourRoute.patch('/:id', protect, restrictTo('admin', 'lead-guide'), updateTour);
tourRoute.delete(
  '/:id',
  protect,
  restrictTo('admin', 'lead-guide'),
  deleteTour
);

module.exports = tourRoute;
