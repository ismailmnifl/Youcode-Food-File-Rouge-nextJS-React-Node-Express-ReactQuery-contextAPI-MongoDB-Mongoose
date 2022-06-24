const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: String,
    age: String,
    email: String,
    avatar: String,
    password: String,
    phoneNumber: String,
    adresse: String,
    token: String,
    resetvations: [{
        type: Schema.Types.ObjectId,
        ref: 'reservation'
    }],
    role: {
        type: Schema.Types.ObjectId,
        ref: 'role'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant'
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;