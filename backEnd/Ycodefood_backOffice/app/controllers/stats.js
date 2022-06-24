const Review = require('../models/review');
const User = require('../models/user');
const Reservation = require('../models/reservation');
const Card = require('../models/card');
const Category = require('../models/category');
const Restaurant = require('../models/restaurant');


module.exports = {

    index: async (req, res, next) => {
        const reviewCount = await Review.countDocuments({});
        const userCount = await User.countDocuments({});
        const reservationCount = await Reservation.countDocuments({});
        const reastauCount = await Restaurant.countDocuments({});
        const categoryCount = await Category.countDocuments({});

        const income = await Card.find({})
        let totalincome = 0;
        for (let index = 0; index < income.length; index++) {

            totalincome = totalincome + income[index].mealPrice;

        }
        res.status(200).json({
            reviewCount: reviewCount,
            userCount: userCount,
            reservationCount: reservationCount,
            income: totalincome,
            reastauCount: reastauCount,
            categoryCount: categoryCount

        })
    },
    reviewStats: async (req, res, next) => {

        const id = req.params.restauId;


        const reviewCount = await Review.countDocuments({ restaurant: id });
        const review = await Review.find({restaurant: id});
        var startsCount= 0;
        for (let index = 0; index < review.length; index++) {
            startsCount = startsCount + review[index]?.stars;
            
        }
        let reviewAVG = startsCount/reviewCount
        res.status(201).json({
            reviewCount: reviewCount,
            startCount :startsCount,
            reviewAVG : reviewAVG
        });

    }




}

