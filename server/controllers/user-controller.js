const {validationResult} = require('express-validator');
const userService = require('../service/user-service');
const ApiError = require('../exceptions/api-error');
class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            
            const {first_name, last_name, email, password} = req.body;
            const userData = await userService.registration(first_name, last_name, email, password);
            res.cookie('refreshToken', await(userData).refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(await(userData));
        } catch (error) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            console.log(req.body)
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {   
            next(e);
        }
    }
    
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.refresh(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(e);
        }
    }
}

module.exports = new UserController();