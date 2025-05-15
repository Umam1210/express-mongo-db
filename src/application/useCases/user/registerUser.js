import { createUserEntity } from '../../../domain/entities/User.js';
import argon2 from 'argon2';

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const registerUser = async ({ name, email, password }, userRepository) => {
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required');
  }

  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await argon2.hash(password);
  const user = createUserEntity({ name, email, passwordHash });

  return await userRepository.save(user);
};
