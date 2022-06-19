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
    async getForFilter(req, res) {
        const {level_id} = req.query;
        const univers = await UniverService.getForFilter(level_id)
        return res.json(univers)
    }
    async getUniversAdmin(req, res) {
        const univers = await UniverService.getUniversAdmin();
        return res.json(univers)
    }
    async create(req, res) {
        const {univer_name, level_id} = req.body
        console.log(req.body)
         const univer = await UniverService.create(univer_name, level_id)
         return res.json(univer)
    }

    async delete(req, res) {
        const {univer_id} = req.body
         const univer = await UniverService.delete(univer_id)
         return res.json(univer)
    }

    async update(req, res) {
        const {univer_name, univer_id} = req.body
        const univer = await UniverService.update(univer_name, univer_id)
        return res.json(univer)
    }
}   
module.exports = new UniversityController();