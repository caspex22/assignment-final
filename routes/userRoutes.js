const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/userController');
const loggingMiddleware = require('../middlewares/logger.js');


router.get('/profile/:userId', authControllers.getProfile);
router.put('/profile/:userId', authControllers.updateProfile);

router.use(loggingMiddleware);

module.exports = router;
