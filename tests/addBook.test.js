import { jest } from '@jest/globals';
import { addBook } from '../src/application/useCases/book/addBook.js';

const mockBookRepo = {
  save: jest.fn()
};

describe('addBook use case', () => {
  it('should add a book and return the created book with id', async () => {
    const input = {
      title: 'fisika',
      author: 'pak yono',
      userId: 'mocked-user-id'
    };

    // Simulasi return dari repository
    mockBookRepo.save.mockResolvedValue({
      ...input,
      id: 'mocked-book-id',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const result = await addBook(input, mockBookRepo);

    expect(mockBookRepo.save).toHaveBeenCalledWith(expect.objectContaining(input));
    expect(result).toHaveProperty('id', 'mocked-book-id');
    expect(result).toHaveProperty('title', 'fisika');
    expect(result).toHaveProperty('author', 'pak yono');
    expect(result).toHaveProperty('userId', 'mocked-user-id');
  });

  it('should throw error if title or author is missing', async () => {
    await expect(addBook({ title: '', author: '', userId: 'user' }, mockBookRepo)).rejects.toThrow(
      'Missing required book fields'
    );
  });
});
