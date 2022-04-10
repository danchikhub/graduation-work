const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER},
    refreshToken: {type: DataTypes.STRING, required: true}
})

module.exports = Token;