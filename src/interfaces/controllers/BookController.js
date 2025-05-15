import { addBook } from '../../application/useCases/book/addBook.js';

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
        message: error.message || 'Failed to retrieve books',
        data: null,
        pagination: null
      });
    }
  };
  

  return {
    addBook: addBookHandler,
    findBookByUserLogin : findAllBook
  };
};
