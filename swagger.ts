const swaggerUi = require('swagger-ui-express');
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Student Portal',
      version: '1.0.0'
    },
    basePath: '/',
    schemes: [
      "http",
      "https"
    ],
    tags: [
      {
        name: "Student",
        description: "Operations about Student"
      }
    ],
    // securityDefinitions: {
    //   Token: {
    //     type: "apiKey",
    //     name: "Authorization",
    //     in: "header",
    //   }
    // }
  },
  apis: [
    './src/api/routes/student.ts',
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setSwagger = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
};
