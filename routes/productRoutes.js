const express = require('express');
const router = express.Router();
const loggingMiddleware = require('../middlewares/logger.js');
const checkRole = require('../middlewares/roleMiddleware.js');
const booksController = require('../controllers/productController.js')

router.get('/books', booksController.getAllBooks);
router.post('/books', checkRole('admin'), booksController.createBooks);
router.get('/books', booksController.getBooksById);
router.put('/books/:id', checkRole('admin'), booksController.updateBooksById);
router.delete('/books/:id', checkRole('admin'), booksController.deleteBooksById);

router.use(loggingMiddleware);

module.exports = router;
