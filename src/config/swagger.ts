import swaggerJSDoc from 'swagger-jsdoc';

const SwaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger API documentation for TodoList API',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            }
        ],
    },
    apis: ['./api_docs/apiPostDoc.yaml']
};

export const swaggerDoc = swaggerJSDoc(SwaggerOptions);