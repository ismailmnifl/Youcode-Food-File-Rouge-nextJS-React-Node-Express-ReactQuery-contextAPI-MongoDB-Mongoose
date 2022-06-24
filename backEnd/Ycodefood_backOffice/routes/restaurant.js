const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const restaurantController = require('../app/controllers/restaurant');

router.route('/')
    .get(restaurantController.index)
    .post(restaurantController.insert)
    .put(restaurantController.update);

router.route('/single/:restauId')
    .get(restaurantController.single);


router.route('/:restauId')
    .delete(restaurantController.delete);


router.route('/allowed')
    .get(restaurantController.allowedRestaurants);




module.exports = router;