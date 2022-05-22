const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const CourseComment = sequelize.define('course_comment',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    course_id: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.INTEGER},
    comment: {type: DataTypes.STRING}
})

module.exports = CourseComment;