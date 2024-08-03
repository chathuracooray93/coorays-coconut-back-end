const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.login);
router.get('/find-user/:username', authController.findUserByUsername);

module.exports = router;