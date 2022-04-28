const ApiError = require('../exceptions/api-error');
const LevelModel = require('../models/level-model');

class LevelController {
    async getAll(req, res) {
        const levels = await LevelModel.findAll();
        return res.json(levels)
    }
}   
module.exports = new LevelController();