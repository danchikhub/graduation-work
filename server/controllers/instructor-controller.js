const InstructorService = require('../service/instructor-service');
class InstructorController {
    async instructorRegistration(req, res, next) {
        try {
            const {contact_email, telephone, biography, univer_id, user_id} = req.body;
            const instructorData = await InstructorService.instructorRegistration(contact_email, telephone, biography, univer_id, user_id);
            return res.json(await(instructorData))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new InstructorController();