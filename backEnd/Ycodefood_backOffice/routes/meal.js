const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const mealController = require('../app/controllers/meal');

router.route('/')
    .get(mealController.index)
    .post(mealController.insert)

router.route('/single')
    .get(mealController.single);


router.route('/restaurant')
    .post(mealController.findByRestaurantId);

router.route('/:mealId')
    .delete(mealController.delete)





module.exports = router;