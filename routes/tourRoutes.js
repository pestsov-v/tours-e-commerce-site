const express = require('express');
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
} = require('../controllers/tourController');
const tourRoute = express.Router();

tourRoute.get('/stats', getTourStats);
tourRoute.get('/monthly-plan/:year', getMonthlyPlan);
tourRoute.get('/top-5-cheap', aliasTopTours, getAllTours);

tourRoute.get('/', protect, getAllTours);
tourRoute.post('/', createTour);

tourRoute.get('/:id', getTour);
tourRoute.patch('/:id', updateTour);
tourRoute.delete(
  '/:id',
  protect,
  restrictTo('admin', 'lead-guide'),
  deleteTour
);

module.exports = tourRoute;
