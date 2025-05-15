import mongoose from 'mongoose';
import request from 'supertest';
import { setupApp } from '../src/app/setupApp.js';
import connectToMongo from '../src/config/mongo.js';
import { createMongoUserRepository } from '../src/infrastructure/repositories/MongoUserRepository.js';
import { createAuthController } from '../src/interfaces/controllers/AuthController.js';
import { createMongoBookRepository } from '../src/infrastructure/repositories/MongoBookRepository.js';
import { createBookController } from '../src/interfaces/controllers/BookController.js';

let app;
let token;

beforeAll(async () => {
  await connectToMongo();

  const userRepo = createMongoUserRepository();
  const authController = createAuthController(userRepo);
  const bookRepo = createMongoBookRepository();
  const bookController = createBookController(bookRepo);

  app = setupApp({ auth: authController, book: bookController });

  await request(app).post('/auth/register').send({
    name: 'Book User',
    email: 'bookuser@example.com',
    password: 'password123'
  });

  const loginRes = await request(app).post('/auth/login').send({
    email: 'bookuser@example.com',
    password: 'password123'
  });

  token = loginRes.body.data.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Book API', () => {
  it('should add a new book', async () => {
    const res = await request(app).post('/books').set('Authorization', `Bearer ${token}`).send({
      title: 'Atomic Habits',
      author: 'James Clear'
    });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('title', 'Atomic Habits');
  });

  it('should get all books with pagination', async () => {
    const res = await request(app)
      .get('/books?page=1&limit=10')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body).toHaveProperty('pagination');
  });
});
