const ApiError = require('../exceptions/api-error');
const LevelModel = require('../models/level-model');
const LevelService = require('../service/level-service')
class LevelController {
    async getAll(req, res) {
        const levels = await LevelModel.findAll();
        return res.json(levels)
    }

    async create(req, res) {
        const {level_name} = req.body
        
        const level = await LevelModel.create({
            level_name: level_name
        })
        
        return res.json(level)
    }

    async update(req, res) {
        const {level_name, level_id} = req.body;
        const level = await LevelModel.update({
            level_name: level_name
        }, {
            where: {id: level_id}
        })
        return res.json(level)
    }

    async delete(req, res) {
        const {level_id} = req.body;
        const level = await LevelModel.destroy({
            where: {id: level_id}
        })
        return res.json(level)
    }
}   
module.exports = new LevelController();