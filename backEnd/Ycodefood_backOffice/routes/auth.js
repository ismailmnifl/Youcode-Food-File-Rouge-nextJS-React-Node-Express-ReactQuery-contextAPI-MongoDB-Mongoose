const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const authController = require('../app/controllers/authontication');

router.route('/')
    .post(authController.login)

module.exports = router;