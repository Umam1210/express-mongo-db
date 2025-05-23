import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const loginUser = async ({ email, password }, userRepository) => {
  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }

  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Email not found');
  if (!user.passwordHash) throw new Error('User not registered');

  const valid = await argon2.verify(user.passwordHash, password);
  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id, email: user.email }, 'SECRET', { expiresIn: '1h' });

  const { passwordHash, ...userSafe } = user;
  return { token, user: userSafe };
};
