import { loginUser } from '../../application/useCases/user/loginUser.js';
import { registerUser } from '../../application/useCases/user/registerUser.js';

export const createAuthController = (userRepo) => {
  const register = async (req, res) => {
    try {
      const user = await registerUser(req.body, userRepo);
      res.status(201).json({
        code: 201,
        message: 'User registered successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        pagination: null
      });
    } catch (error) {
      res.status(400).json({
        code: 400,
        message: error.message,
        data: null,
        pagination: null
      });
    }
  };

  const login = async (req, res) => {
    try {
      const result = await loginUser(req.body, userRepo);
      res.status(200).json({
        code: 200,
        message: 'Login successful',
        data: result,
        pagination: null
      });
    } catch (error) {
      res.status(400).json({
        code: 400,
        message: error.message,
        data: null,
        pagination: null
      });
    }
  };

  return { register, login };
};
