const express = require('express');
const router = express.Router();


const StatsController = require('../app/controllers/stats');

router.route('/')
    .get(StatsController.index);


router.route('/review/:restauId')
    .get(StatsController.reviewStats);



module.exports = router;