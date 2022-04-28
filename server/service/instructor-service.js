const InstructorModel = require('../models/instructor-model');
const UserModel = require('../models/user-model');
const RoleModel = require('../models/role-model');
const ApiError = require('../exceptions/api-error');
class InstructorService {
    async instructorRegistration(contact_email, telephone, biography, univer_id, user_id) {
        const candidate = await InstructorModel.findOne({
            where: {user_id: user_id}
        });
        const user = await UserModel.findOne({
            where: {id: user_id}
        })
        console.log(user.id)
        if(candidate) {
            throw ApiError.BadRequest(`Пользователь как инструктор уже существует`)
        } 
        const instructor = InstructorModel.create({
            contact_email: contact_email,
            telephone: telephone,
            biography: biography,
            univer_id: univer_id,
            user_id: user_id,
            first_name: user.first_name,
            last_name: user.last_name,
        })

       
        UserModel.update({
            role_id: 2
        },
        {
            where:{
                id: user.id
            }
        })
    }
}

module.exports = new InstructorService();