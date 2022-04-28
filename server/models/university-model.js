const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const University = sequelize.define('univer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    univer_name: {type: DataTypes.STRING},
    univer_level: {type: DataTypes.INTEGER},
    
})

module.exports = University;