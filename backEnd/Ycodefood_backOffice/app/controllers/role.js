const Role = require('../models/role');

module.exports = {

    index: async(req, res, next) => {
        try {
            const results = await Role.find({});
            res.status(200).json(results);

        } catch (error) {

            next(error);
        }
    },
    insert: async(req, res, next) => {
        try {
            const newRole = new Role(req.body);
            const role = await newRole.save();
            res.status(201).json(role);
        } catch (error) {

            next(error);
        }
    },
    delete: async(req, res, next) => {
        // try {
            const id= req.body.roleId;
            const deletedRole = await Role.findByIdAndDelete(id);
            res.status(200).json({
                message: "role deleted succesfully !",
                deletedRole:deletedRole
            })
        // } catch (error) {

        //     next(error);
        // }
    },
    single: async(req, res, next) => {
        try {
            const  id  = req.body.roleId;
            const role = await Role.findById(id);
            res.status(200).json(role);
        } catch (error) {

            next(error);
        }
    }

}

  