const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    name: String,
    price: Number,
    size: String,
    sause : String,
    image : String,
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
});

const Meal = mongoose.model('meal', mealSchema);
module.exports = Meal;