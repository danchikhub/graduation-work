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
            
              return res.json(course)
        } catch (error) {
            next(error)
        }
    }

    async updateCourse(req, res, next) {
        try {
            if(req.files === null) {
                const {course_title, course_desc, id, imgFile} = req.body;
                const course = await  CourseService.updateCourse(imgFile,course_title, course_desc, id)
                return res.json(course)
            }else {
                const {course_title, course_desc, id} = req.body;
             const { imgFile } = req.files;
            console.log(req.files)
             let fileName = uuid.v4() + '.jpg';
             imgFile.mv(path.resolve(__dirname, '..', 'static', fileName))
            const course = await  CourseService.updateCourse(fileName,course_title, course_desc, id)
            
              return res.json(course)
            }
            
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const {categoryId, univerId} = req.query;
            const courses = await CourseService.getAll(categoryId, univerId);
            
            return res.json(courses)
        } catch (error) {
            next(error)
        }
    }
    async getAllSearch(req, res, next) {
        try {
            
             const {searchWord} = req.query;
            
             const courses = await CourseService.getAllSearch(searchWord)
             
             return res.json(courses)
        } catch (error) {
            next(error)
        }
    }
    async getAllForPanel(req, res, next) {
        try {
            console.log(req.query)
            const {instructor} = req.query;
            
             const courses = await CourseService.getAllForPanel(instructor);
             return res.json(courses)
        } catch (error) {
            next(error)
        }
    }
    async getOneEdit(req, res, next) {
        try {
            const {id} = req.query;
            const course = await CourseService.getOneEdit(id)
            return res.json(course)
        } catch (error) {
            next(error)
        }
    }
    async getOneCourse(req, res, next) {
        try {
            const {id} = req.query;
            const course = await CourseService.getOneCourse(id)
            return res.json(course)
        } catch (error) {
            next(error)
        }
    }
    async deleteCourse(req, res, next) {
        try {
            const {course_id} = req.body;
            const course = await CourseService.deleteCourse(course_id);
            return res.json(course)
        } catch (error) {
            next(error)
        }
    }
    async setRewiew(req, res, next) {
        try {
            
            const {course_id, user_id, rating, comment} = req.body;
            const rewiew = await CourseService.setRewiew(course_id, user_id, rating, comment);
            return res.json(rewiew)
        } catch (error) {
            next(error)
        }
    }

    async getRewiew(req, res) {
        try {
            const {course_id} = req.query;
            const rewiews = await CourseService.getRewiew(course_id)
            return res.json(rewiews)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new CourseController()