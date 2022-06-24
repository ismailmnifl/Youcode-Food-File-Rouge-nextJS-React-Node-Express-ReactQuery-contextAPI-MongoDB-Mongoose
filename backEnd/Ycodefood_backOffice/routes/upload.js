const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const uploadController = require('../app/controllers/upload');

router.route('/')
    .post(uploadController.uploader);
module.exports = router;