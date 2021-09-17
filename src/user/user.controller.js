const log = require('../logger/logger.connect');
const userService = require('./user.service');
const Router = require('express').Router;
const router = Router();

//ADD NEW USER
router.post('/', async (req, res) => {
    try {
        log.debug("user.controller.js: user req.body= ", req.body)
        if (!Object.keys(req.body).length) return res.status(400).json({message: "Bad Request"});

        const user = await userService.create(req.body);
        if (!Object.keys(user).length) return res.status(400).json({message: "Bad Request"});
        log.debug("user.controller.js: Created user= ", user);

        return  res.status(201).json({message: "success", data: user});
    } catch (error) {
        log.error("user.controller.js: Create user error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

//GET ALL USERS
router.get('/', async (req, res) => {
    try {
        log.debug("user.controller.js: Get all")

        const users = await userService.getAll()
        if (!Object.keys(users).length) return res.status(404).json({message: "Not found"});
        log.debug("user.controller.js: Get all users= ", users);

        return res.status(200).json({message: "success", data: users});
    } catch (error) {
        log.error("user.controller.js: Get all users error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

//GET POPULAR USERS
router.get('/popular', async (req, res) => {
    try {
        log.debug("user.controller.js: Get popular")

        const popular = await userService.getPopular()
        if (!popular.length) return res.status(404).json({message: "Not found"});
        log.debug("user.controller.js: Get popular= ", popular);

        return res.status(200).json({message: "success", data: popular});
    } catch (error) {
        log.error("user.controller.js: Get popular error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

//GET ONE USER BY ID
router.get('/:id', async (req, res) => {
    try {
        log.debug("user.controller.js: Get user by id= ", req.params.id)

        const userById = await userService.getById(req.params.id)
        log.debug("user.controller.js: Get user= ", userById);

        return res.status(200).json({message: "success", data: userById});
    } catch (error) {
        log.error("user.controller.js: Get user by id error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});



//GET COUNT OF USER FRIENDS
router.get('/friendscount/:id', async (req, res) => {
    try {
        log.debug("user.controller.js: Get count by id= ", req.params.id)

        const friendsCountById = await userService.getFriends(req.params.id)
        log.debug("user.controller.js: Get user= ", friendsCountById);

        return res.status(200).json({message: "success", data: friendsCountById});
    } catch (error) {
        log.error("user.controller.js: Get count by id error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

//SUBSCRIBE
router.put('/subscribe/:id', async (req, res) => {
    try {
        log.debug("user.controller.js: subscribe new user = ", req.body, 'current user id = ', req.params.id)

        const subscribe = await userService.subscribe(req.params.id, req.body.subscribed)
        log.debug("user.controller.js: subscribe user= ", subscribe);

        if (subscribe) return res.status(200).json({message: "subscribed"});
    } catch (error) {
        log.error("user.controller.js: subscribe user error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

//UNSUBSCRIBE
router.delete('/subscribe/:id', async (req, res) => {
    try {
        log.debug("user.controller.js: unsubscribe user = ", req.body, 'current user id = ', req.params.id)

        const unsubscribe = await userService.unsubscribe(req.params.id, req.body.unsubscribed)
        log.debug("user.controller.js: unsubscribe user= ", unsubscribe);

        if (unsubscribe) return res.status(200).json({message: "unsubscribed"});
    } catch (error) {
        log.error("user.controller.js: unsubscribe user error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;
