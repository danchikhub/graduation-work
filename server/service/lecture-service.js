const InstructorModel = require('../models/instructor-model');
const LectureModel = require('../models/lecture-model');
const LectureRatingModel = require('../models/lectureRating-model');
const LectureCommentModel = require('../models/lectureComment-model')
const { QueryTypes } = require('sequelize');
const sequelize = require('../db')
class LectureService {
    async createLecture(lecture_img, lecture_title, lecture_desc, lecture_file, category_id, user_id) {
        const instructor = await InstructorModel.findOne({
            where: { user_id: user_id }
        })

        const lecture = await LectureModel.create({
            lecture_img: lecture_img,
            lecture_title: lecture_title,
            lecture_desc: lecture_desc,
            lecture_file: lecture_file,
            category_id: category_id,
            instructor_id: instructor.id,
            university_id: instructor.univer_id
        })

        return lecture
    }
    async updateLecture(lecture_img,lecture_title, lecture_desc, lecture_file, category_id, lecture_id) {
        const lecture = await LectureModel.update({
            lecture_img: lecture_img,
            lecture_title: lecture_title,
            lecture_desc: lecture_desc,
            lecture_file: lecture_file,
            category_id: category_id,
        }, {
            where: {id: lecture_id}
        })
        return lecture
    }
    async getOne(id) {
        const lecture = await LectureModel.findOne({
            where: {id: id}
        })
        
        return lecture
    }
    async getAllForPanel(instructor) {
        const instructorId = await InstructorModel.findOne({
            where: { user_id: instructor }
        })
        const lectures = await sequelize.query(`
            select lectures.id,lectures.category_id, lectures.instructor_id,
                    categories.category_name, 
                    lectures.lecture_title, univers.univer_name
                    from lectures
                    left join categories  on categories.id = lectures.category_id
                    join univers on univers.id =  lectures.university_id 
                    where lectures.instructor_id = ${instructorId.id}
        
        `, {
            type: QueryTypes.SELECT
          })
          return lectures
    }
    async deleteLecture(id) {
        const lecture = await LectureModel.destroy({
           where: {id: id}
        })
        return lecture;
    }

    async getAll(categoryId, univerId) {

        const lectures = await sequelize.query(`
            select lectures.id, lectures.category_id, lectures.university_id,lectures.lecture_img,
            lectures.lecture_title, univers.univer_name,
            AVG(lecture_ratings.rating) AS average_rating
            from lectures
            left join lecture_ratings on lecture_ratings.lecture_id = lectures.id
            join univers on univers.id =  lectures.university_id 
            group by lectures.id, univers.univer_name
        `, {type: QueryTypes.SELECT})
        if(categoryId == 0 && univerId == 0) return lectures;
        if(categoryId != 0 && univerId == 0) {
            const result = lectures.filter(item => item.category_id == categoryId)
            return result
        }
        if(categoryId == 0 && univerId != 0) {
            const result = lectures.filter(item => item.university_id == univerId)
            return result
        }
        if(categoryId != 0 && univerId != 0) {
            const result = lectures.filter(item => item.university_id == univerId && item.category_id == categoryId)
            return result;
        }
        
    }

    async getAllSearch(word) {
        const lectures = await sequelize.query(`
            select lectures.id, lectures.category_id, lectures.university_id,lectures.lecture_img,
            lectures.lecture_title, univers.univer_name,
            AVG(lecture_ratings.rating) AS average_rating
            from lectures
            left join lecture_ratings on lecture_ratings.lecture_id = lectures.id
            join univers on univers.id =  lectures.university_id 
            where lectures.lecture_title like '${word}%'
            group by lectures.id, univers.univer_name
        `, {type: QueryTypes.SELECT})
        return lectures
    }

    async getOneLecture(id) {
        const lecture = await sequelize.query(`
            select lectures.id, lectures.lecture_title,lectures.lecture_file, lectures.lecture_desc, lectures.lecture_img,
            AVG(lecture_ratings.rating) AS average_rating, instructors.first_name, instructors.last_name
            from lectures
            left join lecture_ratings on lecture_ratings.lecture_id = lectures.id
            left join instructors on instructors.id = lectures.instructor_id
            where lectures.id = ${id}
            group by lectures.id, instructors.first_name, instructors.last_name
        `,{type: QueryTypes.SELECT})
        return lecture
    }

    async setRewiew(lecture_id,user_id, rat, comm) {
        const ratingRewiew = await LectureRatingModel.create({
            lecture_id: lecture_id,
            user_id: user_id,
            rating: rat
        })
        const commentRewiew = await LectureCommentModel.create({
            lecture_id: lecture_id,
            user_id: user_id,
            comment: comm
        })
        return {ratingRewiew, commentRewiew}
    }
    async getRewiew(lecture_id) {
        const rewiews = await sequelize.query(`
            select lecture_comments.id, lecture_comments.comment, users.first_name 
            from lecture_comments
            left join users on lecture_comments.user_id = users.id
            where lecture_comments.lecture_id = ${lecture_id}
        `,{
            type: QueryTypes.SELECT
          })
          console.log(rewiews)
        return rewiews
    }
}
module.exports = new LectureService()