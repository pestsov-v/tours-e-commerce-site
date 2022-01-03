const express = require('express');
const { getOverview, getTour} = require('../controllers/viewsController');
const viewRoute = express.Router();

viewRoute.get('/', getOverview);
viewRoute.get('/tour/:slug', getTour);

module.exports = viewRoute;
