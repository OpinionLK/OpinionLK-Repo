import express from 'express';
import authRoutes from './routes/auth.js';
import clientRoutes from './routes/client.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import surveyRoutes from './routes/surveys.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const ORIGIN_URL = process.env.ORIGIN_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 3002;

app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the OpinionLK API',
  });
});
// MIDDLEWARE
app.use(express.json());
app.use(cors({ origin: ORIGIN_URL, optionsSuccessStatus: 200 }));

// ROUTES
app.use('/api/auth', authRoutes); 
app.use('/api/client', clientRoutes);
app.use('/api/user', userRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/survey/images', express.static('./uploads/surveyheader'));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    console.log('MongoDB Connected');
  })
  .catch((error) => console.error('Error connecting to MongoDB: ', error.message));
