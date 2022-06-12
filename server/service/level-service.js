const LevelModel = require('../models/lecture-model');

class LevelService {
    async create(level_name) {
        const level = await LevelModel.create({
            level_name: level_name
        })
        return level
    }
    async delete(level_id) {
        const level = await LevelModel.destroy({
            where: {id: level_id}
        })
        return level
    }

    async update(level_name, level_id) {
        const level = await LevelModel.update({
            level_name: level_name
        }, {
            where: {id: level_id}
        })

        return level
    }
}

module.exports = new LevelService()