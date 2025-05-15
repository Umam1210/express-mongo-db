import mongoose from 'mongoose';
import request from 'supertest';
import { setupApp } from '../src/app/setupApp.js';
import connectToMongo from '../src/config/mongo.js';
import { createMongoUserRepository } from '../src/infrastructure/repositories/MongoUserRepository.js';
import { createAuthController } from '../src/interfaces/controllers/AuthController.js';

let app;

beforeAll(async () => {
  await connectToMongo();
  const userRepo = createMongoUserRepository();
  const authController = createAuthController(userRepo);
  app = setupApp({ auth: authController });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API', () => {
  const userData = {
    name: 'Test User',
    email: `testuser_${Date.now()}@example.com`, // 👈 pakai email unik agar tidak bentrok
    password: 'password123'
  };

  it('should register a new user', async () => {
    const response = await request(app).post('/auth/register').send(userData);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('email', userData.email);
  });

  it('should login with correct credentials', async () => {
    const response = await request(app).post('/auth/login').send({
      email: userData.email,
      password: userData.password
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data.user).toHaveProperty('email', userData.email);
  });

  it('should fail to login with wrong password', async () => {
    const response = await request(app).post('/auth/login').send({
      email: userData.email,
      password: 'wrongpassword'
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid password');
  });
});
