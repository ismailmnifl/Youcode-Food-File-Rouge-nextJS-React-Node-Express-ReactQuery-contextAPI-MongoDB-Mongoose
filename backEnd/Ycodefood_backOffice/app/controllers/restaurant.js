const Restaurant = require('../models/restaurant');
const User = require('../models/user');

module.exports = {

    index: async(req, res, next) => {
        try {
           
            const results = await Restaurant.find({});
            res.status(200).json(results);
            
        } catch (error) {

            next(error);
        }
    },
    allowedRestaurants: async(req, res, next) => {
        try {
            
            const results = await Restaurant.find({allowed : true});
            res.status(200).json(results);
            
        } catch (error) {

            next(error);
        }
    },
    insert: async(req, res, next) => {
        try {
            const newRestaurant = new Restaurant(req.body);
            const restaurant = await newRestaurant.save();
            res.status(201).json(restaurant);
        } catch (error) {

            next(error);
        }
    },
    delete: async(req, res, next) => {
        try {
            const id = req.params.restauId;
            const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
            res.status(200).json({
                message: "role deleted succesfully !",
                deletedRestaurant : deletedRestaurant
            })

        } catch (error) {
            res.status(200).json({
                message: error,
            })
        }
           
     
    },
    single: async(req, res, next) => {
        try {
            const od = req.params.restauId
            const id = req.body.restauId;
            const restaurant = await Restaurant.findById(od);
            res.status(200).json(restaurant);
        } catch (error) {

            next(error);
        }
    },
    update: async(req, res, next) => {
        try {
            const id = req.body._id;
            const restaurant = await Restaurant.findByIdAndUpdate(id, req.body,{new: true});
            res.status(200).json(restaurant);
        } catch (error) {

            next(error);
        }
    }

}

  