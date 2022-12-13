const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');
router.post('/createUser', UserController.createUser);

module.exports = router;