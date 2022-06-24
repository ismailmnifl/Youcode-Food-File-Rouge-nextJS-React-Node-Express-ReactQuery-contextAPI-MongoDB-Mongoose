const Category = require('../models/category');

module.exports = {

    index: async(req, res, next) => {
        try {
            const results = await Category.find({});
            res.status(200).json(results);

        } catch (error) {

            next(error);
        }
    },
    insert: async(req, res, next) => {
        try {
            const newCategory = new Category(req.body);
            res.status(201).json(newCategory);
        
            const category = await newCategory.save();
            res.status(201).json(category);
        } catch (error) {

            next(error);
        }
    },
    delete: async(req, res, next) => {
        try {
            const id = req.body.categoryId;

            const deletedCategory = await Category.findByIdAndDelete(id);
            res.status(200).json({
                message: "role deleted succesfully !",
                deletedCategory : deletedCategory
            })
        } catch (error) {

            next(error);
        }
    },
    single: async(req, res, next) => {
        try {
            const id = req.body.categoryId;
            const category = await Category.findById(id);
            res.status(200).json(category);
        } catch (error) {

            next(error);
        }
    }

}

  