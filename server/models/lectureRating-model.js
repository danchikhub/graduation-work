const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const LectureRating = sequelize.define('lecture_rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lecture_id: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.INTEGER},
    rating: {type: DataTypes.INTEGER}
})

module.exports = LectureRating