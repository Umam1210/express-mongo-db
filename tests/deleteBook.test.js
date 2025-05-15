import { jest } from '@jest/globals';
import { deleteBook } from '../src/application/useCases/book/deleteBook.js';

const mockRepo = {
  findById: jest.fn(),
  deleteById: jest.fn()
};

describe('deleteBook use case', () => {
  it('should call repository to delete book by id', async () => {
    const mockBook = {
      id: 'book123',
      title: 'Sample Book',
      author: 'Author',
      userId: 'user456'
    };

    mockRepo.findById.mockResolvedValue(mockBook);
    mockRepo.deleteById.mockResolvedValue(true);

    const result = await deleteBook({ bookId: 'book123', userId: 'user456' }, mockRepo);

    expect(result).toBe(true);
    expect(mockRepo.findById).toHaveBeenCalledWith('book123');
    expect(mockRepo.deleteById).toHaveBeenCalledWith('book123');
  });

  it('should throw error if book not found', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(deleteBook({ bookId: 'invalid', userId: 'user456' }, mockRepo)).rejects.toThrow(
      'Book not found'
    );
  });

  it('should throw error if user is not the owner', async () => {
    const mockBook = {
      id: 'book123',
      title: 'Sample Book',
      author: 'Author',
      userId: 'someone-else'
    };

    mockRepo.findById.mockResolvedValue(mockBook);

    await expect(deleteBook({ bookId: 'book123', userId: 'user456' }, mockRepo)).rejects.toThrow(
      'Unauthorized'
    );
  });
});
