const User = require('../models/user');
const Role = require('../models/role');

const jwt = require('jsonwebtoken');
const Restaurant = require('../models/restaurant');
const bcrypt = require("bcrypt")


module.exports = {
    index: async (req, res, next) => {
        try {
            
            const results = await User.find({}).populate('role');
            res.status(200).json(results);

        } catch (error) {

            next(error);
        }
    },
    insert: async (req, res, next) => {
        // try {
            const hashedPassword = await bcrypt.hash(req.body.password, 8);
            const newUser = new User(req.body);
            newUser.password = hashedPassword;
            const restaurant = await Restaurant.findById(req.body.restauId)
            const role = await Role.findById(req.body.roleId);
            newUser.role = role;
            newUser.restaurant = restaurant;
            const user = await newUser.save();

            res.status(201).json(user);

        // } catch (error) {

        //     res.status(500).json({
        //         message: error
        //     });
        // }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.userIndex;
            const deletedUser = await User.findByIdAndDelete(id);
            res.status(200).json({
                message: "user daleted succefully",
                deleteduser: deletedUser
            })
        } catch (error) {

            next(error);
        }
    },
    single: async (req, res, next) => {
        try {
            const id = req.body.userId;
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {

            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.body._id;
            const user = await User.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(user);
        } catch (error) {

            next(error);
        }
    }
}