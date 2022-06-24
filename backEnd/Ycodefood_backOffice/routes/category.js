const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const categoryController = require('../app/controllers/category');

router.route('/')
    .get(categoryController.index)
    .post(categoryController.insert)
    .delete(categoryController.delete);
router.route('/single')
    .get(categoryController.single);

module.exports = router;