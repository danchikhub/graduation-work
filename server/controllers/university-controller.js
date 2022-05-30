const ApiError = require('../exceptions/api-error');
const UniversityModel = require('../models/university-model');
const UniverService = require('../service/univer-service');
class UniversityController {
    async getAll(req, res) {
        const univers = await UniversityModel.findAll();
        return res.json(univers)
    }
    async getUniverRating(req, res) {
        const univers_rating = await UniverService.getUniverRating();
        return res.json(univers_rating)
    }
}   
module.exports = new UniversityController();