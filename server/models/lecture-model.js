const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Lecture = sequelize.define('lecture', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lecture_img: {type: DataTypes.STRING, allowNull:false},
    lecture_title: {type: DataTypes.STRING},
    lecture_desc: {type: DataTypes.STRING},
    lecture_file: {type: DataTypes.STRING, allowNull:false},
    category_id: {type: DataTypes.INTEGER},
    instructor_id: {type: DataTypes.INTEGER},
    university_id: {type: DataTypes.INTEGER}

})

module.exports = Lecture;