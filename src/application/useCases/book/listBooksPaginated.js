export const listBooksPaginated = async (page, limit, bookRepo) => {
  return await bookRepo.findAllPaginated(page, limit);
};
