const InstructorModel = require('../models/instructor-model');
const CourseModel = require('../models/course-model');
class CourseService {
    async courseCreate(fileName, course_title, course_desc,category_id,user_id) {
        console.log(user_id)
        const instructor = await InstructorModel.findOne({
            where: {user_id: user_id}
        })

        const course = await CourseModel.create({
            course_img: fileName,
            course_title: course_title,
            course_desc: course_desc,
            category_id: category_id,
            instructor_id: instructor.id,
            univer_id: instructor.univer_id,
        })
        return course
        
    }
}

module.exports = new CourseService();