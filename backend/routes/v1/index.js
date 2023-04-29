const express = require('express');
const authRoute = require('./auth.route');
const audioRoute = require('./audio.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },{
    path: '/audio',
    route : audioRoute
  }
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
