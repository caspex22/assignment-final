const express = require('express');
const router = express.Router();
const loggingMiddleware = require('../middlewares/logger.js');
const checkRole = require('../middlewares/roleMiddleware.js');
const authControllers = require('../controllers/userController');


router.post('/login/admin', checkRole('admin'), authControllers.admin);
router.post('/login',authControllers.login);
router.post('/register', authControllers.register);

router.use(loggingMiddleware);

module.exports = router;
