const swaggerAutogen= require('swagger-autogen')();

const doc= 
{
    info: 
    {
        title: "Users API",
        description: "Users/Posts API"
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const ouputFile = './swagger.json';
const endpointsFiles= ['./routes/index.js'];

swaggerAutogen(ouputFile,endpointsFiles,doc);