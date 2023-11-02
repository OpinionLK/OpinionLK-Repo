import express from 'express';
import authRoutes from './routes/auth.js';
import clientRoutes from './routes/client.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import surveyRoutes from './routes/surveys.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import paymentsRoutes from './routes/payments.js';
import morgan from 'morgan';
import ImageKit from "imagekit";

import PlatformData from './models/PlatformData.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: "json" };

var options = {
  explorer: true
};

dotenv.config();

const app = express();
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');

const PORT = process.env.PORT || 3002;

app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the OpinionLK API',
  });
});

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};

// MIDDLEWARE
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  // The database connection is established, proceed with operations.
  // ROUTES
  app.use('/api/auth', authRoutes);
  app.use('/api/client', clientRoutes);
  app.use('/api/payment', paymentsRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/survey', surveyRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/survey/images', express.static('./uploads/surveyheader'));


  console.log('MongoDB Connected');

  // Initialize platform data
  PlatformData.find({})
    .then((pd) => {
      if (pd.length === 0) {
        console.log('Creating platform data');
        const platformData = new PlatformData({
          surveyBaseCost: 1000,
          surveyCostPerResponse: 10,
          perDayCost: 7,
          maxDuration: 14,
          perQuestionCost: 20,
        });
        return platformData.save();
      } else {
        console.log('Platform data already exists');
        return Promise.resolve(); // Resolve promise to continue
      }
    })
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.error('An error occurred:', error.message));
})
.catch((error) => console.error('Error connecting to MongoDB: ', error.message));

//image uploads
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL
});
app.get('/api/uploadKeys', (req, res) => {
  res.json({ imagekit });
})

app.get('/api/generateAuth', (req, res) => {
  const authenticationParams = imagekit.getAuthenticationParameters();
  res.json({ authenticationParams });
});
