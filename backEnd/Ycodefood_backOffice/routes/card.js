const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const cardController = require('../app/controllers/card');

router.route('/')
    .post(cardController.insert)
    .get(cardController.getAll)
    

router.route('/:cardId')
    .delete(cardController.delete);

router.route('/:userId')
    .get(cardController.index);


router.route('/restaurant/:restauId')
    .get(cardController.cardForSingleRestaurant);

module.exports = router;