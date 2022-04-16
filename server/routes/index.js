const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
module.exports = router;