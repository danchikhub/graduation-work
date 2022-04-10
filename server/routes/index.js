const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');

router.post('/registration', userController.registration);


module.exports = router;