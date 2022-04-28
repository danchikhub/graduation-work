const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const RoleUser = sequelize.define('role_user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER},
    role_id: {type: DataTypes.INTEGER}
})

module.exports = RoleUser;