const express = require('express');
const { getOverview, getTour } = require('../controllers/viewsController');
const viewRoute = express.Router();

viewRoute.get('/overview', getOverview);
viewRoute.get('/tour', getTour);

module.exports = viewRoute;
