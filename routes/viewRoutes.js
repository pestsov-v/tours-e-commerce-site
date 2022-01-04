const express = require('express');
const { protect, isLoggedIn } = require('../controllers/authController');
const { getOverview, getTour, getLoginForm} = require('../controllers/viewsController');
const viewRoute = express.Router();

viewRoute.use(function (req, res, next) {
    res.setHeader(
      "Content-Security-Policy",
      "script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js"
    );
    next();
  });
  
  viewRoute.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src * 'self' data: https:;");
    next();
  });

viewRoute.use(isLoggedIn);

viewRoute.get('/login', getLoginForm);
viewRoute.get('/', getOverview);
viewRoute.get('/tour/:slug', getTour);



module.exports = viewRoute;
