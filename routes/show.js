const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAutheticated');
const showController = require('../controller/show');
const { ROUTES } = require('../constants/routes');

router.get(ROUTES.SHOW.GET_SHOWS, isAuthenticated, showController.getShows);
router.get(`${ROUTES.SHOW.GET_DETAILS}/:id`, isAuthenticated, showController.getShowById);

module.exports = router;
