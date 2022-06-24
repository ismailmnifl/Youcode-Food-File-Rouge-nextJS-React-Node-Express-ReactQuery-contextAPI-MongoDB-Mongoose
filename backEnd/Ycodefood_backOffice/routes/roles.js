const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const roleController = require('../app/controllers/role');

router.route('/')
    .get(roleController.index)
    .post(roleController.insert)
    .delete(roleController.delete);

router.route('/single')
    .get(roleController.single);
module.exports = router;