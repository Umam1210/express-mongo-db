import { Router } from 'express';
import { createBookController } from '../controllers/BookController.js';
import { createMongoBookRepository } from '../../infrastructure/repositories/MongoBookRepository.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

const bookRepo = createMongoBookRepository();
const bookController = createBookController(bookRepo);

// Tambah buku baru
router.post('/', authenticate, bookController.addBook);
router.get('/', authenticate, bookController.findBookByUserLogin);
router.delete('/:id', authenticate, bookController.deleteBookById);
router.get('/list', bookController.getAllBooks);
router.put('/:id', authenticate, bookController.updateBook);
router.get('/:id', authenticate, bookController.getBookById);

// (Opsional untuk nanti)
// router.get('/', authenticate, bookController.getBooks);
// router.get('/:id', authenticate, bookController.getBookById);
// router.put('/:id', authenticate, bookController.updateBook);
// router.delete('/:id', authenticate, bookController.deleteBook);

export default router;
