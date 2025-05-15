export const listAllBook = async (bookRepo) => {
  const books = await bookRepo.findAll();
  return books;
}