const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const reviewController = require('../app/controllers/review');

router.route('/')
    .get(reviewController.index)
    .post(reviewController.insert)
    .delete(reviewController.delete);

router.route('/single')
.get(reviewController.single);
    

router.route('/restaurant/:restaurantId')
.get(reviewController.reviewForSigleRestaurant);


module.exports = router;