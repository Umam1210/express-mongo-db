export const deleteBook = async ({ bookId, userId }, bookRepo) => {
  const book = await bookRepo.findById(bookId);

  if (!book) {
    throw new Error('Book not found');
  }
  if (book.userId !== userId) {
    throw new Error('Unauthorized');
  }
  await bookRepo.deleteById(bookId);
  return true;
};
