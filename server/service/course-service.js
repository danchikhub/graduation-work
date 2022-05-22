const InstructorModel = require('../models/instructor-model');
const CourseModel = require('../models/course-model');
const CourseRatingModel = require('../models/courseRating-model');
const CourseCommentModel = require('../models/courseComment-model');
const { QueryTypes } = require('sequelize');
const sequelize = require('../db')
class CourseService {
    async courseCreate(fileName, course_title, course_desc,category_id,user_id) {
       
        const instructor = await InstructorModel.findOne({
            where: {user_id: user_id}
        })

        const course = await CourseModel.create({
            course_img: fileName,
            course_title: course_title,
            course_desc: course_desc,
            category_id: category_id,
            instructor_id: instructor.id,
            university_id: instructor.univer_id,
        })
        return course
        
    }

    async updateCreate(fileName, course_title, course_desc,id) {

        const course = await CourseModel.update({
            course_img: fileName,
            course_title: course_title,
            course_desc: course_desc,
            
        }, {
            where: {id: id}
        })
        return course
        
    }

    async getAll(categoryId, univerId) {
        const courses = await sequelize.query('select courses.id,courses.category_id, courses.university_id,courses.course_img,courses.course_title, univers.univer_name, courses.course_title, AVG(course_ratings.rating) AS average_rating from courses left join course_ratings on course_ratings.course_id = courses.id join univers on univers.id =  courses.university_id group by courses.id, univers.univer_name',{
            type: QueryTypes.SELECT
          })
        if(categoryId == 0 && univerId == 0) return courses;
        if(categoryId != 0 && univerId == 0) {
            const result = courses.filter(item => item.category_id == categoryId)
            return result
        }
        if(categoryId == 0 && univerId != 0) {
            const result = courses.filter(item => item.university_id == univerId)
            return result
        }
        if(categoryId != 0 && univerId != 0) {
            const result = courses.filter(item => item.university_id == univerId && item.category_id == categoryId)
            return result;
        }
    }
    async getAllSearch(word) {
        const courses = await sequelize.query(`select courses.id,courses.category_id, courses.university_id,courses.course_img,courses.course_title, univers.univer_name, courses.course_title, AVG(course_ratings.rating) AS average_rating 
                                                from courses 
                                                left join course_ratings on course_ratings.course_id = courses.id 
                                                join univers on univers.id =  courses.university_id 
                                                where courses.course_title like '${word}%'
                                                group by courses.id, univers.univer_name`,{
            type: QueryTypes.SELECT
          })
          return courses
    }

    async getAllForPanel(instructor) {
        
        const instructorId = await InstructorModel.findOne({
            where: {user_id: instructor}
        })
        const courses = await sequelize.query(`
            select courses.id,courses.category_id, courses.instructor_id,
                 categories.category_name, 
                   courses.course_title, univers.univer_name
            from courses
            left join categories  on categories.id = courses.category_id
            join univers on univers.id =  courses.university_id 
            where courses.instructor_id = ${instructorId.id}
        `,{
            type: QueryTypes.SELECT
          })
        return courses
    }
    async getOneEdit(id) {
        const course = await CourseModel.findOne({
            where: {id: id}
        })
        return course;
    } 
    async getOneCourse(id) {
        const course = await sequelize.query(`
            select courses.id, courses.course_title, courses.course_desc, courses.course_img,
            AVG(course_ratings.rating) AS average_rating, instructors.first_name, instructors.last_name
            from courses
            left join course_ratings on course_ratings.course_id = courses.id
            left join instructors on instructors.id = courses.instructor_id
            where courses.id = ${id}
            group by courses.id, instructors.first_name, instructors.last_name
        `,{
            type: QueryTypes.SELECT
          })
          return course
    }
    async deleteCourse(id) {
        const course = await CourseModel.destroy({
            where: {id: id}
        })
        return course
    }
    async setRewiew( course_id,user_id, rat, comm) {
        const ratingRewiew = await CourseRatingModel.create({
            course_id: course_id,
            user_id: user_id,
            rating: rat
        })
        const commentRewiew = await CourseCommentModel.create({
            course_id: course_id,
            user_id: user_id,
            comment: comm
        })
        return {ratingRewiew, commentRewiew}
    }
}

module.exports = new CourseService();