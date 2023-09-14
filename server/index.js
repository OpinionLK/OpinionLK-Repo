import express from 'express';
import authRoutes from './routes/auth.js';
import clientRoutes from './routes/client.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import surveyRoutes from './routes/surveys.js';
import userRoutes from './routes/user.js';

dotenv.config();
const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const ORIGIN_URL = process.env.ORIGIN_URL;

app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the OpinionLK API',
  });
});

app.listen(process.env.PORT || 3000);
// MIDDLEWARE
app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN_URL, optionsSuccessStatus: 200 }));

// ROUTES
app.use('/api/auth', authRoutes); 
app.use('/api/client', clientRoutes);
app.use('/api/user', userRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/survey/images', express.static('./uploads/surveyheader'));

// Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OpinionLK API Documentation',
      version: '0.0.1',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: `${process.env.ORIGIN_URL}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);
app.use('/api-docs', swagger.serve, swagger.setup(specs));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => console.error('Error connecting to MongoDB: ', error.message));
