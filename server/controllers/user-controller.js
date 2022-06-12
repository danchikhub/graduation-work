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
            next(error);
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
            next(error);
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
            next(error);
        }
    }

    async getAll(req, res) {
        try {
            const users = await userService.getAll();
            return res.json(users)
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req, res) {
        try {
            const {user_id} = req.body
            const user = await userService.delete(user_id)
            return res.json(user)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController();