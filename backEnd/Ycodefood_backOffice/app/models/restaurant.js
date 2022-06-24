const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: String,
    logo : String,
    adresse: String,
    email: String,
    phoneNumber: String,
    allowed: Boolean,
    mapsId : String,
    meal: [{
        type: Schema.Types.ObjectId,
        ref: 'meal'
    }],
    review:[{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }]
});

const Restaurant = mongoose.model('restaurant', restaurantSchema);
module.exports = Restaurant;