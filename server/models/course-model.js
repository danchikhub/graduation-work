const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Course = sequelize.define('course',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    course_img: {type: DataTypes.STRING, allowNull:false},
    course_title: {type: DataTypes.STRING},
    course_desc: {type: DataTypes.STRING},
    category_id: {type: DataTypes.INTEGER},
    instructor_id: {type: DataTypes.INTEGER},
    university_id: {type: DataTypes.INTEGER}
})

module.exports = Course;