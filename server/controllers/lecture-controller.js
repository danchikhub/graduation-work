const uuid = require('uuid');
const path = require('path');
const LectureService = require('../service/lecture-service');
const { nextTick } = require('process');

class LectureController {
    async createLecture(req, res, next) {
        try {
            const { lecture_title, lecture_desc, category_id, user_id } = req.body;
            
            const { imgFile, lectureFile } = req.files;
            console.log(imgFile)
            let lecture_img = uuid.v4() + '.jpg';
            let lecture_file = uuid.v4() + '.pdf';
            imgFile.mv(path.resolve(__dirname, '..', 'static', lecture_img))
            lectureFile.mv(path.resolve(__dirname, '..', 'static', lecture_file))
            const lecture = await LectureService.createLecture(lecture_img, lecture_title, lecture_desc, lecture_file, category_id, user_id);

            return res.json(lecture)


        } catch (error) {
            next(error)
        }
    }
    async updateLecture(req, res, next) {
        try {
            console.log(req.body)
            if(req.files === null) {
                const {lectureFile, imgFile, lecture_title, lecture_desc, lecture_id} = req.body
                const lecture = await LectureService.updateLecture(imgFile, lecture_title, lecture_desc, lectureFile, lecture_id)
                return res.json(lecture)
            }else {
                 const { lecture_title, lecture_desc, lecture_id } = req.body;
                const {imgFile, lectureFile} = req.files;
                let lecture_img = uuid.v4() + '.jpg';
                let lecture_file = uuid.v4() + '.pdf';
                imgFile.mv(path.resolve(__dirname, '..', 'static', lecture_img))
                lectureFile.mv(path.resolve(__dirname, '..', 'static', lecture_img))
                const lecture = await LectureService.updateLecture(lecture_img,lecture_title, lecture_desc, lecture_file, lecture_id);
                return res.json(lecture)
            }
           
        } catch (error) {
            next(error)
        }
    }
    async getAllForPanel(req, res, next) {
        try {
            console.log(req.query)
            const {instructor} = req.query;
            
             const lectures = await LectureService.getAllForPanel(instructor);
             return res.json(lectures)
        } catch (error) {
            next(error)
        }
    }
    async getOne(req, res, next) {
        try {
            const {id} = req.query;
            const lecture = await LectureService.getOne(id)
            return res.json(lecture)
        } catch (error) {
            next(error)
        }
    }
    async deleteLecture( req, res, next) {
        try {
            const {lecture_id} = req.body;
            const lecture = await LectureService.deleteLecture(lecture_id)
            return res.json(lecture)
        } catch (error) {
            next(error)
        }
    }
    async getAll(req, res, next) {
        try {
            const {categoryId, univerId} = req.query;
            const lectures = await LectureService.getAll(categoryId, univerId);
            return res.json(lectures)
        } catch (error) {
            next(error)
        }
    }
    async getAllSearch(req, res, next) {
        try {
            
             const {searchWord} = req.query;
            
             const lectures = await LectureService.getAllSearch(searchWord)
             
             return res.json(lectures)
        } catch (error) {
            next(error)
        }
    }
    async getOneLecture(req, res, next) {
        try {
            const {id} = req.query;
            const lecture = await LectureService.getOneLecture(id)
            return res.json(lecture)
        } catch (error) {
            next(error)
        }
    }
    async setRewiew(req, res, next) {
        try {
            
            const {lecture_id, user_id, rating, comment} = req.body;
            const rewiew = await LectureService.setRewiew(lecture_id, user_id, rating, comment);
            return res.json(rewiew)
        } catch (error) {
            next(error)
        }
    }
    async getRewiew(req, res) {
        try {
            const {lecture_id} = req.query;
            const rewiews = await LectureService.getRewiew(lecture_id)
            return res.json(rewiews)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new LectureController();