import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scriptify API',
      version: '1.0.0',
      description: 'API Documentation',
    },
    // servers: [
    //   {
    //     url: 'http://localhost:3000/api',
    //     description: 'Scriptify server',
    //   },
    // ],
  },
  apis: ['./src/api/**/*.ts'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
