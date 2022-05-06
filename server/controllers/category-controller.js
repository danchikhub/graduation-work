const ApiError = require('../exceptions/api-error');
const CategoryModel = require('../models/category-model');

class CategoryController {
    async getAll(req, res) {
        const categories = await CategoryModel.findAll();
        return res.json(categories)
    }
}   
module.exports = new CategoryController();