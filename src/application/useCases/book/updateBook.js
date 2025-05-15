export const updateBook = async ({ id, title, author, userId }, bookRepo) => {
  const existingBook = await bookRepo.findById(id);

  if (!existingBook) {
    throw new Error('Book not found');
  }

  if (existingBook.userId !== userId) {
    throw new Error('Unauthorized to update this book');
  }

  const updated = await bookRepo.updateById(id, { title, author });
  return updated;
};
