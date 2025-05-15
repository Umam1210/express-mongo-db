import { addBook } from '../../application/useCases/book/addBook.js';
import { deleteBook } from '../../application/useCases/book/deleteBook.js';
import { listBooksPaginated } from '../../application/useCases/book/listBooksPaginated.js';
import { updateBook } from '../../application/useCases/book/updateBook.js';

export const createBookController = (bookRepo) => {
  const addBookHandler = async (req, res) => {
    try {
      const { title, author } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          code: 401,
          message: 'Unauthorized',
          data: null,
          pagination: null
        });
      }

      const book = await addBook({ title, author, userId }, bookRepo);

      return res.status(201).json({
        code: 201,
        message: 'Book added successfully',
        data: book,
        pagination: null
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        message: error.message,
        data: null,
        pagination: null
      });
    }
  };

  const findAllBook = async (req, res) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          code: 401,
          message: 'Unauthorized',
          data: null,
          pagination: null
        });
      }

      const books = await bookRepo.findByUserId(userId);

      return res.status(200).json({
        code: 200,
        message: 'Books retrieved successfully',
        data: books,
        pagination: null
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: error.message,
        data: null,
        pagination: null
      });
    }
  };

  const deleteBookHandler = async (req, res) => {
    try {
      const bookId = req.params.id;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          code: 401,
          message: 'Unauthorized',
          data: null,
          pagination: null
        });
      }

      await deleteBook({ bookId, userId }, bookRepo);

      return res.status(200).json({
        code: 200,
        message: 'Book deleted successfully',
        data: null,
        pagination: null
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        message: error.message,
        data: null,
        pagination: null
      });
    }
  };

  const getAllBooks = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await listBooksPaginated(page, limit, bookRepo);

      return res.status(200).json({
        code: 200,
        message: 'Books retrieved successfully',
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: error.message,
        data: null,
        pagination: null
      });
    }
  };

  const updateBookHandler = async (req, res) => {
    try {
      const bookId = req.params.id;
      const { title, author } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          code: 401,
          message: 'Unauthorized',
          data: null,
          pagination: null
        });
      }

      const updatedBook = await updateBook({ id: bookId, title, author, userId }, bookRepo);

      return res.status(200).json({
        code: 200,
        message: 'Book updated successfully',
        data: updatedBook,
        pagination: null
      });
    } catch (error) {
      return res.status(400).json({
        code: 400,
        message: error.message,
        data: null,
        pagination: null
      });
    }
  };

  return {
    addBook: addBookHandler,
    findBookByUserLogin: findAllBook,
    deleteBookById: deleteBookHandler,
    getAllBooks: getAllBooks,
    updateBook: updateBookHandler
  };
};
