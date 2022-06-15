const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');
const levelController = require('../controllers/level-controller');
const UniversityController = require('../controllers/university-controller');
const instructorController = require('../controllers/instructor-controller');
const categoryController = require('../controllers/category-controller');
const courseController = require('../controllers/course-controller');
const themeController = require('../controllers/theme-controller');
const lectureController = require('../controllers/lecture-controller');
const univerService = require('../service/univer-service');
const universityController = require('../controllers/university-controller');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.post('/course-create', courseController.createCourse);
router.post('/course-update', courseController.updateCourse)
router.get('/courses', courseController.getAll)
router.get('/courses-search', courseController.getAllSearch)
router.get('/course-panel', courseController.getAllForPanel)
router.get('/course-edit', courseController.getOneEdit)
router.post('/course-delete', courseController.deleteCourse)
router.get('/course', courseController.getOneCourse)
router.post('/course-rewiew', courseController.setRewiew)
router.post('/theme-create', themeController.createTheme)
router.post('/theme-update', themeController.updateTheme)
router.post('/theme-delete', themeController.deleteTheme)
router.get('/themes', themeController.getThemes)
router.get('/levels', levelController.getAll);
router.get('/univers', UniversityController.getAll);
router.get('/categories', categoryController.getAll);
router.post('/instructor-registration', instructorController.instructorRegistration);
router.get('/univers-rating', UniversityController.getUniverRating);
router.post('/lecture-create', lectureController.createLecture);
router.get('/lecture-panel', lectureController.getAllForPanel);
router.post('/lecture-update', lectureController.updateLecture);
router.get('/lecture-get', lectureController.getOne)
router.post('/lecture-delete', lectureController.deleteLecture);
router.get('/lectures', lectureController.getAll);
router.get('/lecture', lectureController.getOneLecture);
router.get('/lectures-search', lectureController.getAllSearch);
router.post('/lecture-rewiew', lectureController.setRewiew)


router.post('/category-create', categoryController.create);
router.post('/category-delete', categoryController.delete);
router.post('/category-update', categoryController.update);


router.get('/univers-admin', UniversityController.getUniversAdmin);
router.post('/univer-create', universityController.create)
router.post('/univer-delete', universityController.delete)
router.post('/univer-update', universityController.update)


router.post('/level-create', levelController.create)
router.post('/level-update', levelController.update)
router.post('/level-delete', levelController.delete)

router.get('/users', userController.getAll);
router.post('/user-delete', userController.delete)

router.get('/rewiew-getcourse', courseController.getRewiew);
router.get('/rewiew-getlecture', lectureController.getRewiew);
module.exports = router;