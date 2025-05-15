import { createBookEntity } from "../../../domain/entities/Book.js";

export const addBook = async ({ title, author, userId }, bookRepo) => {
  const book = createBookEntity({ title, author, userId });
  return await bookRepo.save(book);
};
