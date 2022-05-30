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
}
module.exports = new UniverService()