const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
        },
        userName: String,
        mealPrice:Number,
        mealName:String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    meal: {
        type: Schema.Types.ObjectId,
        ref: 'meal'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    },

});

const Card = mongoose.model('card', cardSchema);
module.exports = Card;