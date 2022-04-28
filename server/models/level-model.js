const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Level = sequelize.define('level', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    level_name: {type: DataTypes.STRING},
    
})

module.exports = Level;