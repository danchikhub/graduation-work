const {validationResult} = require('express-validator');
const userService = require('../service/user-service');
class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return console.log("Error in server");
            }
            console.log(req.body)
            const {first_name, last_name, email, password} = req.body;
            const userData = await userService.registration(first_name, last_name, email, password);
            res.cookie('refreshToken', await(userData).refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(await(userData));
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController();