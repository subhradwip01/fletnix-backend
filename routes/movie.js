const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAutheticated');
const movieController = require('../controller/movie');

router.get('/', isAuthenticated, movieController.getMovies);
router.get('/show-details/:id', isAuthenticated, movieController.getMovieById);

module.exports = router;
