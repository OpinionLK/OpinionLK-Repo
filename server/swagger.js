import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
      title: 'OpinionLK API',
      description: 'Description',
    },
    host: 'localhost:3002',
    schemes: ['http'],
  };
  
  const outputFile = './swagger-output.json';
  const endpointsFiles = ['./index.js'];
  
  /* NOTE: if you use the express Router, you must pass in the 
     'endpointsFiles' only the root file where the route starts,
     such as index.js, app.js, routes.js, ... */
  
  swaggerAutogen(outputFile, endpointsFiles, doc);