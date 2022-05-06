const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Instructor = sequelize.define('instructor', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    contact_email: {type: DataTypes.STRING},
    telephone: {type: DataTypes.STRING},
    biography: {type: DataTypes.STRING},
    univer_id: {type: DataTypes.INTEGER},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    user_id: {type: DataTypes.INTEGER}
})

module.exports = Instructor;                    