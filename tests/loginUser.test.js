import { describe, it, expect, jest } from '@jest/globals';

jest.unstable_mockModule('argon2', () => ({
  default: { verify: jest.fn() }
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: { sign: jest.fn() }
}));

const { default: argon2 } = await import('argon2');
const { default: jwt } = await import('jsonwebtoken');
const { loginUser } = await import('../src/application/useCases/user/loginUser.js');

describe('loginUser use case', () => {
  const mockUserRepo = {
    findByEmail: jest.fn()
  };

  it('should return token and user data when login is successful', async () => {
    const mockUser = {
      id: 'mocked-id',
      email: 'test@example.com',
      passwordHash: 'hashed-password'
    };

    mockUserRepo.findByEmail.mockResolvedValue(mockUser);
    argon2.verify.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mocked-jwt-token');

    const result = await loginUser(
      { email: 'test@example.com', password: 'password123' },
      mockUserRepo
    );

    expect(result.token).toBe('mocked-jwt-token');
    expect(result.user).toEqual({
      id: 'mocked-id',
      email: 'test@example.com'
    });
  });
});
