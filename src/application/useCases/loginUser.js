import  argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const loginUser = async ({ email, password }, userRepository) => {
    const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Email tidak ditemukan');

  const valid = await argon2.verify(user.passwordHash, password);
  if (!valid) throw new Error('Password salah');

  const token = jwt.sign({ id: user.id, email: user.email }, 'SECRET', { expiresIn: '1h' });

  const { passwordHash, ...userSafe } = user;
  return { token, user: userSafe };

}