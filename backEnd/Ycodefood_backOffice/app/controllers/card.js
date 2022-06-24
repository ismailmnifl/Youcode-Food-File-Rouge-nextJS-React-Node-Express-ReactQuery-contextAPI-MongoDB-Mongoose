const Card = require('../models/card');
const User = require('../models/user');
const Meal = require('../models/meal');
const Restaurant = require('../models/restaurant');


module.exports = {

    index: async(req, res, next) => {
        try {
            const userId = req.params.userId;
            const results = await Card.find({user: userId}).populate('meal').populate('user');
            res.status(200).json(results);

        } catch (error) {
            next(error);
        }
    },
    insert: async(req, res, next) => {
            const userId = req.body.userId;
            const mealId = req.body.mealId;
            const restauId = req.body.restauId;
            
            
            const user = await User.findById(userId);
            const meal = await Meal.findById(mealId);
            const restaurant = await Restaurant.findById(restauId);

            const newCard = new Card(req.body);

            newCard.meal = meal;
            newCard.user = user;
            newCard.restaurant = restaurant;

            const card = await newCard.save();
            res.status(201).json(card);
    },
    delete: async(req, res, next) => {
        const cardId = req.params.cardId;
        const deletedCard = await Card.findByIdAndDelete(cardId);
        res.status(200).json({
            message: "card was deleted succefully",
            deletedCard: deletedCard,
            
        })
    },
    cardForSingleRestaurant: async(req, res, next) => {
        
        const restauId = req.params.restauId;
        console.log("restauIdex : ",restauId);
      
        const cards = await Card.find({restaurant : restauId});
        res.status(200).json(cards)
    },
    getAll: async(req, res, next) => {
        
        const results = await Card.find({}).limit(5);

        res.status(200).json(results)
    },

   

}

  