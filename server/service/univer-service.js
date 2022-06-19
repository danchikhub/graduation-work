const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const UniversityModel = require('../models/university-model');

class UniverService {
    async getUniverRating() {
        const univers_rating = await sequelize.query(`
            select  univers.univer_name, AVG(course_ratings.rating) AS average_rating from courses
            left join course_ratings on course_ratings.course_id = courses.id
            left join univers on univers.id = courses.university_id
            group by  univers.univer_name
        `,{
            type: QueryTypes.SELECT
          })
          return univers_rating
    }
    async getUniversAdmin() {
        const univers = await sequelize.query(`
            select univers.id, univers.univer_name, levels.level_name
            from univers
            left join  levels on levels.id = univers.univer_level
        `, {
            type: QueryTypes.SELECT
        })
        return univers
    }

    async create(univer_name, level_id) {
        const univer = await UniversityModel.create({
            univer_name: univer_name,
            univer_level: level_id
        })
        return univer
    }
    async delete(univer_id) {
        const univer = await UniversityModel.destroy({
            where: {id: univer_id}
        })
        return univer
    }
    async update(univer_name, univer_id) {
        
        const univer = await UniversityModel.update({
            univer_name: univer_name
        }, {
            where: {id: univer_id}
        })
        return univer
    }
    async getForFilter(level_id) {
        const univers = await UniversityModel.findAll({
            where: {
                univer_level: level_id
            }
        })
        return univers
    }
}
module.exports = new UniverService()