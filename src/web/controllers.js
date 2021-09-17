const Router = require('express').Router;
const router = Router();
const userController = require('../user/user.controller');

router.use('/users', userController)

module.exports = router;