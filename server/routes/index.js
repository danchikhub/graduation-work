const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');
const levelController = require('../controllers/level-controller');
const UniversityController = require('../controllers/university-controller');
const instructorController = require('../controllers/instructor-controller');
const categoryController = require('../controllers/category-controller');
const courseController = require('../controllers/course-controller');
const themeController = require('../controllers/theme-controller');
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.post('/course-create', courseController.createCourse)
router.post('/theme-create', themeController.createTheme)
router.get('/levels', levelController.getAll);
router.get('/univers', UniversityController.getAll);
router.get('/categories', categoryController.getAll);
router.post('/instructor-registration', instructorController.instructorRegistration);
module.exports = router;