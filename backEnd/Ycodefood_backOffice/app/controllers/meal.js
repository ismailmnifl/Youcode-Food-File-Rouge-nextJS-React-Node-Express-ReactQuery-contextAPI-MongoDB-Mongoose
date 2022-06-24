const Meal = require('../models/meal');
const Category = require('../models/category');
const Restaurant = require('../models/restaurant');


module.exports = {

    index: async (req, res, next) => {
        try {
            const results = await Meal.find({}).populate('category').populate('restaurant');
            res.status(200).json(results);

        } catch (error) {
            next(error);
        }
    },
    insert: async (req, res, next) => {

        try {
            const newMeal = new Meal(req.body);
            const categoryId = req.body.categoryId;
            const restaurantId = req.body.restaurantId;

            const category = await Category.findById(categoryId);
            const restaurant = await Restaurant.findById(restaurantId);
            newMeal.category = category;
            newMeal.restaurant = restaurant;

            const meal = await newMeal.save();
            res.status(201).json(meal);

        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            // const categoryId = req.body.mealId;
            const mealId = req.params.mealId;
            const deletedMeal = await Meal.findByIdAndDelete(mealId);
            res.status(200).json({
                message: "role deleted succesfully !",
                deletedRole: deletedMeal
            })
        } catch (error) {
            next(error);
        }
    },
    single: async (req, res, next) => {
        try {
            const mealId = req.body.mealId;
            const meal = await Meal.findById(mealId).populate('category').populate('restaurant');
            res.status(200).json(meal);
        } catch (error) {
            next(error);
        }
    },

    findByRestaurantId: async (req, res, next) => {
        try {
            const restaurantId = req.body.restaurantId;
            const meals = await Meal.find({ restaurant: restaurantId }).populate("category");
            if (meals)  res.status(200).json(meals);
        } catch (error) {
            res.status(400).json(error);
        }



    }
}

