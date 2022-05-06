const uuid = require('uuid');
const path = require('path');
const CourseService = require('../service/course-service');
class CourseController {
    async createCourse(req, res, next) {
        try {
            
            const {course_title, course_desc, category_id, user_id} = req.body;
             const { imgFile } = req.files;
            
             let fileName = uuid.v4() + '.jpg';
             imgFile.mv(path.resolve(__dirname, '..', 'static', fileName))
            const course = await  CourseService.courseCreate(fileName,course_title, course_desc, category_id, user_id)
            console.log(course)
              return res.json(course)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CourseController()