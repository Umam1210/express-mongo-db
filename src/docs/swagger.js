export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Express mongoose',
    version: '1.0.0',
    description: 'express mongoose api'
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
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
              }
            }
          }
        },
        responses: {
          201: {
            description: 'User registered successfully'
          },
          400: {
            description: 'Error registering user'
          }
        }
      }
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
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Login success'
          },
          400: {
            description: 'Invalid login'
          }
        }
      }
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
                  author: { type: 'string' }
                },
                required: ['title', 'author']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Book added successfully'
          },
          400: {
            description: 'Error adding book'
          },
          401: {
            description: 'Unauthorized – token missing or invalid'
          }
        }
      }
    },
    '/books/list': {
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
                  author: { type: 'string' }
                },
                required: ['title', 'author']
              }
            }
          }
        },
        responses: {
          201: { description: 'Book added successfully' },
          400: { description: 'Error adding book' },
          401: { description: 'Unauthorized – token missing or invalid' }
        }
      },
      get: {
        summary: 'Get all books with pagination',
        description: 'Returns a paginated list of books. Use query parameters `page` and `limit`.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'page',
            in: 'query',
            description: 'Page number',
            required: false,
            schema: { type: 'integer', default: 1 }
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of items per page',
            required: false,
            schema: { type: 'integer', default: 10 }
          }
        ],
        responses: {
          200: {
            description: 'List of books with pagination',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: { type: 'integer' },
                    message: { type: 'string' },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          title: { type: 'string' },
                          author: { type: 'string' },
                          userId: { type: 'string' },
                          createdAt: { type: 'string', format: 'date-time' },
                          updatedAt: { type: 'string', format: 'date-time' }
                        }
                      }
                    },
                    pagination: {
                      type: 'object',
                      properties: {
                        total: { type: 'integer' },
                        page: { type: 'integer' },
                        perPage: { type: 'integer' },
                        totalPages: { type: 'integer' }
                      }
                    }
                  }
                }
              }
            }
          },
          401: { description: 'Unauthorized – token missing or invalid' }
        }
      }
    },
    get: {
      summary: 'Get all books with pagination',
      description:
        'Returns a paginated list of books. Use query parameters `page` and `limit` to control pagination.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'page',
          in: 'query',
          description: 'Page number',
          required: false,
          schema: {
            type: 'integer',
            default: 1
          }
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Number of items per page',
          required: false,
          schema: {
            type: 'integer',
            default: 10
          }
        }
      ],
      responses: {
        200: {
          description: 'List of books with pagination',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  code: { type: 'integer' },
                  message: { type: 'string' },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        author: { type: 'string' },
                        userId: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                      }
                    }
                  },
                  pagination: {
                    type: 'object',
                    properties: {
                      total: { type: 'integer' },
                      page: { type: 'integer' },
                      perPage: { type: 'integer' },
                      totalPages: { type: 'integer' }
                    }
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
    },
    '/books/{id}': {
      patch: {
        summary: 'Update a book',
        description:
          'Update the title or author of a book by its ID. Only the owner can update it.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            description: 'ID of the book to update'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  author: { type: 'string' }
                },
                required: []
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Book updated successfully'
          },
          400: {
            description: 'Validation or update error'
          },
          401: {
            description: 'Unauthorized – token missing or invalid'
          },
          404: {
            description: 'Book not found'
          }
        }
      },
      delete: {
        summary: 'Delete a book',
        description: 'Delete a book by its ID. Only the owner can delete it.',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string'
            },
            description: 'ID of the book to delete'
          }
        ],
        responses: {
          200: {
            description: 'Book deleted successfully'
          },
          401: {
            description: 'Unauthorized – token missing or invalid'
          },
          404: {
            description: 'Book not found'
          }
        }
      },
      get: {
        summary: 'Get book by ID',
        description: 'Get a specific book by its ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: { description: 'Book found' },
          404: { description: 'Book not found' },
          401: { description: 'Unauthorized' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
