const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: String,
    description: String,
    meal: [{
        type: Schema.Types.ObjectId,
        ref: 'meal'
    }],
});

const Category = mongoose.model('category', categorySchema);
module.exports = Category;