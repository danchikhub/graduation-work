const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const LectureComment = sequelize.define('lecture_comment',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lecture_id: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.INTEGER},
    comment: {type: DataTypes.STRING}
})

module.exports = LectureComment;