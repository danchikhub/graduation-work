const CategoryModel = require('../models/category-model');

class CategoryService {
    async create(category_name) {
        const category = await CategoryModel.create({
            category_name: category_name
        })
        return category
    }
    async delete(category_id) {
        const category = await CategoryModel.destroy({
            where: {id: category_id}
        })
        return category
    }

    async update(category_id, category_name) {
        const category = await CategoryModel.update({
            category_name: category_name
        }, {
            where: {id: category_id}
        })
        return category
    }

    
}

module.exports = new CategoryService()