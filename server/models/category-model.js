const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Category = sequelize.define('category',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    category_name: {type: DataTypes.STRING},
})

module.exports = Category;