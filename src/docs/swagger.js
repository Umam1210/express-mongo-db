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
                    password: { type: 'string' }
                  },
                  required: ['name', 'email', 'password']
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
                    password: { type: 'string' }
                  },
                  required: ['email', 'password']
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
    },
  };
  