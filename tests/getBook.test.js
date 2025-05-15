import { jest } from '@jest/globals';
import { listAllBook } from '../src/application/useCases/book/listAllBook.js';

const mockRepo = {
  findAll: jest.fn()
};

describe('listAllBook use case', () => {
  it('should return all books', async () => {
    const books = [
      { id: 'book1', title: 'Book A', author: 'Author A', userId: 'user1' },
      { id: 'book2', title: 'Book B', author: 'Author B', userId: 'user2' }
    ];

    mockRepo.findAll.mockResolvedValue(books);

    const result = await listAllBook(mockRepo);

    expect(result).toEqual(books);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });
});
