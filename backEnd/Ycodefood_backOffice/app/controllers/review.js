const Review = require('../models/review');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
module.exports = {

    index: async(req, res, next) => {
        try {
            const results = await Review.find({});
            res.status(200).json(results);

        } catch (error) {

            next(error);
        }
    },
    insert: async(req, res, next) => {
        
            const newReview = new Review(req.body);
            const userId = req.body.userId;
            const restauId = req.body.restauId;
            const restaurant = await Restaurant.findById(restauId)
            const user = await User.findById(userId);
            newReview.user = user;
            newReview.restaurant = restaurant;
            const review = await newReview.save();
            res.status(201).json(review);
       
    },
    delete: async(req, res, next) => {
        try {
            const  id  = req.body.reviewId;

            const deletedReview = await Review.findByIdAndDelete(id);
            res.status(200).json({
                message: "role deleted succesfully !",
                deletedReview : deletedReview
            })
        } catch (error) {

            next(error);
        }
    },
    single: async(req, res, next) => {
        try {
            const  id  = req.body.reviewId;
            const review = await Review.findById(id);
            res.status(200).json(review);
        } catch (error) {

            next(error);
        }
    },
    reviewForSigleRestaurant : async(req, res, next) => {
        try {

            const id = req.params.restaurantId;
            
            const reviews = await Review.find({ restaurant: id }).populate('user')

            res.status(200).json(reviews);
        } catch (error) {
            res.status(400).json({
                message : "no reviews were found for this restaurant"
            })
        }
    }

}

  