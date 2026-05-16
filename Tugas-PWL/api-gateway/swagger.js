const swaggerJsdoc = require('swagger-jsdoc'); 
 
const options = { 
  definition: { 
    openapi: '3.0.0', 
    info: { 
      title: 'Microservices API Gateway', 
      version: '1.0.0', 
      description: 'API Gateway for Book and User Services', 
      contact: { 
        name: 'Febry Damatraseta Fairuz'
         } 
    }, 
    servers: [ 
      { 
        url: 'http://localhost:8080', 
        description: 'Development server' 
      } 
    ], 
    tags: [ 
      { 
        name: 'Books', 
        description: 'Book management endpoints' 
      }, 
      { 
        name: 'Users', 
        description: 'User management and authentication' 
      }, 
      { 
        name: 'Health', 
        description: 'Health check endpoints' 
      } 
    ], 
    components: { 
      schemas: { 
        Book: { 
          type: 'object', 
          required: ['title', 'author', 'sinopsis', 'story', 'image'], 
          properties: { 
            id: { 
              type: 'integer', 
              description: 'Book ID', 
              example: 1 
            }, 
            title: { 
              type: 'string', 
              description: 'Book title', 
              example: 'The Great Gatsby' 
            }, 
            author: {
              type: 'string',
              description: 'Book author',
              example: 'F. Scott Fitzgerald'
            },
            rating: { 
              type: 'number', 
              description: 'Book rating', 
              example: 4.5 
            }, 
            views: { 
              type: 'integer', 
              description: 'Number of views', 
              example: 100 
            }, 
            is_free: { 
              type: 'boolean', 
              description: 'Indicates if the book is free', 
              example: false 
            },
            language: { 
              type: 'string', 
              description: 'Book language', 
              example: 'English' 
            },
            sinopsis: {
              type: 'string',
              description: 'Book sinopsis',
              example: 'The Great Gatsby is a novel by F. Scott Fitzgerald that explores themes of wealth, love, and the American Dream in 1920s America.'
            },
            story: {
              type: 'string',
              description: 'Book story',
              example: 'The story follows the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan, set against the backdrop of the Roaring Twenties.'
            },
            image: {
              type: 'string',
              description: 'URL of the book cover image',
              example: 'https://example.com/images/great-gatsby.jpg'
            }
          } 
        }, 
        User: { 
          type: 'object', 
          required: ['username', 'email', 'password'], 
          properties: { 
             id: { 
              type: 'string', 
              description: 'User ID', 
              example: '507f1f77bcf86cd799439011' 
            }, 
            username: { 
              type: 'string', 
              description: 'Username', 
              example: 'johndoe' 
            }, 
            email: { 
              type: 'string', 
              format: 'email', 
              description: 'User email', 
              example: 'john@example.com' 
            }, 
            password: { 
              type: 'string', 
              format: 'password', 
              description: 'User password', 
              example: 'password123' 
            }, 
            role: { 
              type: 'string', 
              enum: ['user', 'admin'], 
              description: 'User role', 
              example: 'user' 
            } 
          } 
        }, 
        LoginRequest: { 
          type: 'object', 
          required: ['email', 'password'], 
          properties: { 
            email: { 
              type: 'string', 
              format: 'email', 
              example: 'john@example.com' 
            }, 
            password: { 
              type: 'string', 
              format: 'password', 
              example: 'password123' 
            } 
          } 
        }, 
        LoginResponse: { 
          type: 'object', 
          properties: { 
            success: { 
              type: 'boolean', 
              example: true 
            }, 
            token: { 
              type: 'string', 
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' 
            }, 
            user: { 
              $ref: '#/components/schemas/User' 
               } 
          } 
        }, 
        SuccessResponse: { 
          type: 'object', 
          properties: { 
            success: { 
              type: 'boolean', 
              example: true 
            }, 
            message: { 
              type: 'string', 
              example: 'Operation successful' 
            }, 
            data: { 
              type: 'object' 
            } 
          } 
        }, 
        ErrorResponse: { 
          type: 'object', 
          properties: { 
            success: { 
              type: 'boolean', 
              example: false 
            }, 
            message: { 
              type: 'string', 
              example: 'Error message' 
            } 
          } 
        } 
      }, 
      securitySchemes: { 
        bearerAuth: { 
          type: 'http', 
          scheme: 'bearer', 
          bearerFormat: 'JWT', 
          description: 'Enter JWT token' 
        } 
      } 
    } 
  }, 
  apis: ['./swagger-docs.js'] 
}; 
 
module.exports = swaggerJsdoc(options); 