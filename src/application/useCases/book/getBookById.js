export const getBookById = async (id, bookRepo) => {
  const book = await bookRepo.findById(id);
  if (!book) {
    throw new Error('Book not found');
  }
  return book;
};
