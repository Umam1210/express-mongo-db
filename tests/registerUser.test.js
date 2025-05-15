import { jest } from '@jest/globals';
import { registerUser } from '../src/application/useCases/user/registerUser.js';

const mockUserRepo = {
  findByEmail: jest.fn(),
  save: jest.fn()
};

describe('registerUser use case', () => {
  it('should register user when email not taken', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);
    mockUserRepo.save.mockImplementation((user) => ({
      ...user,
      id: 'mocked-id'
    }));

    const result = await registerUser(
      { name: 'John', email: 'john@example.com', password: '12345678' },
      mockUserRepo
    );

    expect(result).toHaveProperty('id', 'mocked-id');
    expect(result).toHaveProperty('email', 'john@example.com');
  });
});
