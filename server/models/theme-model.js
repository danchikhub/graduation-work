const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Theme = sequelize.define('theme',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    theme_title: {type: DataTypes.STRING},
    theme_desc: {type: DataTypes.STRING},
    theme_file: {type: DataTypes.STRING, allowNull:false},
    course_id: {type: DataTypes.INTEGER}
    
})

module.exports = Theme;