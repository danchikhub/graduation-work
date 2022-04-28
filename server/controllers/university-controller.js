const ApiError = require('../exceptions/api-error');
const UniversityModel = require('../models/university-model');

class UniversityController {
    async getAll(req, res) {
        const univers = await UniversityModel.findAll();
        return res.json(univers)
    }
}   
module.exports = new UniversityController();