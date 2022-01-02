const express = require('express');
const {
  getOverview,
  getTour,
  base,
} = require('../controllers/viewsController');
const viewRoute = express.Router();

viewRoute.get('/', base);
viewRoute.get('/overview', getOverview);
viewRoute.get('/tour', getTour);

module.exports = viewRoute;
