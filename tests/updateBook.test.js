import { jest } from '@jest/globals';
import { updateBook } from '../src/application/useCases/book/updateBook.js';

const mockRepo = {
  findById: jest.fn(),
  updateById: jest.fn()
};

describe('updateBook use case', () => {
  it('should update book if user is owner', async () => {
    const existingBook = {
      id: 'book123',
      title: 'Old Title',
      author: 'Old Author',
      userId: 'user123'
    };

    const updatedBook = {
      id: 'book123',
      title: 'New Title',
      author: 'New Author',
      userId: 'user123'
    };

    mockRepo.findById.mockResolvedValue(existingBook);
    mockRepo.updateById.mockResolvedValue(updatedBook);

    const result = await updateBook(
      { id: 'book123', title: 'New Title', author: 'New Author', userId: 'user123' },
      mockRepo
    );

    expect(result).toEqual(updatedBook);
    expect(mockRepo.findById).toHaveBeenCalledWith('book123');
    expect(mockRepo.updateById).toHaveBeenCalledWith('book123', {
      title: 'New Title',
      author: 'New Author'
    });
  });

  it('should throw error if book not found', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(
      updateBook({ id: 'book999', title: 'New', author: 'New', userId: 'user123' }, mockRepo)
    ).rejects.toThrow('Book not found');
  });

  it('should throw error if user is not the owner', async () => {
    const book = {
      id: 'book123',
      title: 'Old Title',
      author: 'Old Author',
      userId: 'otherUser'
    };

    mockRepo.findById.mockResolvedValue(book);

    await expect(
      updateBook({ id: 'book123', title: 'X', author: 'Y', userId: 'user123' }, mockRepo)
    ).rejects.toThrow('Unauthorized to update this book');
  });
});
