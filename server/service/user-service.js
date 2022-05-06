const UserModel = require('../models/user-model');
const RoleModel = require('../models/role-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
class UserService {
    async registration(first_name, last_name, email, password) {
        const role = await RoleModel.findOne({
            where: {role_name: "student"}
        })
        console.log('role', role.id)
        const candidate = await UserModel.findOne({
            where: {email: email}
        });
        if(candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        } 
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({
            first_name: first_name, 
            last_name: last_name,
            email: email,
            password: hashPassword,
            role_id: role.id
        });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        console.log(`userDton ${userDto.role}`)
        return {...tokens, user: userDto}
    }
    async login(email, password) {
        const user = await UserModel.findOne({
            where: {email: email}
        });
        console.log(user.id)
        if(!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
            if(!refreshToken) {
                console.log("Ooops");
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);
            if(!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError();
            }
            const user = await UserModel.findOne({
                where:{id:  userData.id}    
            });
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            return {...tokens, user: userDto}
        
    }
}

module.exports = new UserService();