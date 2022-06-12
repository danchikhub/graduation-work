const ApiError = require('../exceptions/api-error');
const CategoryModel = require('../models/category-model');
const CategoryService = require('../service/category-service')
class CategoryController {
    async getAll(req, res) {
        const categories = await CategoryModel.findAll();
        return res.json(categories)
    }
    async create(req, res) {
        const {category_name} = req.body
         const category = await CategoryService.create(category_name)
         return res.json(category)
    }
    async delete(req, res) {
        const {category_id} = req.body
         const category = await CategoryService.delete(category_id)
         return res.json(category)
    }
    async update(req, res) {
        const {category_name, category_id} = req.body
         const category = await CategoryService.update(category_name, category_id)
         return res.json(category)
    }
}   
module.exports = new CategoryController();