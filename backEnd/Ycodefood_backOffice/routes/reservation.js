const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const reservationController = require('../app/controllers/reservation');

router.route('/')
    .get(reservationController.index)
    .post(reservationController.insert)
    .delete(reservationController.delete);


module.exports = router;