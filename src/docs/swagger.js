export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Express mongoose',
    version: '1.0.0',
    description: 'express mongoose api',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['name', 'email', 'password'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
          },
          400: {
            description: 'Error registering user',
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login success',
          },
          400: {
            description: 'Invalid login',
          },
        },
      },
    },
    '/books': {
      post: {
        summary: 'Add a new book',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  author: { type: 'string' },
                },
                required: ['title', 'author'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Book added successfully',
          },
          400: {
            description: 'Error adding book',
          },
          401: {
            description: 'Unauthorized – token missing or invalid',
          },
        },
      },
    },
    '/books': {
  post: {
    summary: 'Add a new book',
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              author: { type: 'string' },
            },
            required: ['title', 'author'],
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Book added successfully',
      },
      400: {
        description: 'Error adding book',
      },
      401: {
        description: 'Unauthorized – token missing or invalid',
      },
    },
  },
  get: {
    summary: 'Get all books owned by the current user',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'List of user\'s books',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: { type: 'string' },
                  title: { type: 'string' },
                  author: { type: 'string' },
                  userId: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        }
      },
      401: {
        description: 'Unauthorized – token missing or invalid'
      }
    }
  }
},
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
