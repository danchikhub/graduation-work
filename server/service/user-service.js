const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
class UserService {
    async registration(first_name, last_name, email, password) {
        const candidate = await UserModel.findOne({
            where: {email: email}
        });
        if(candidate) {
            console.log(`Пользователь с почтовым адресом ${email} уже существует`);
        } 
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({
            first_name: first_name, 
            last_name: last_name,
            email: email,
            password: hashPassword,
        });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        console.log(`userDton ${user.id}`)
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();