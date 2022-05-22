const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const CourseRating = sequelize.define('course_rating',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    course_id: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.INTEGER},
    rating: {type: DataTypes.INTEGER}
})

module.exports = CourseRating;