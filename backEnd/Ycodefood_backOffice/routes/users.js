const express = require('express');
const router = express.Router();

//this package use try catche by default so we dont have to use myself
//const router = require('express-promise-router')();

const usersControllers = require('../app/controllers/user');
const authorasation = require('../middlewares/isStaff');

router.route('/')
    .get(usersControllers.index)
    .post(usersControllers.insert)
    .put(usersControllers.update);

router.route('/single')
    .get(usersControllers.single);

router.route('/:userIndex')
    .delete(usersControllers.delete);

module.exports = router;