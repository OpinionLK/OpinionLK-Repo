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
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');
const PORT = process.env.PORT || 3002;

app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the OpinionLK API',
  });
});

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
}
// MIDDLEWARE
app.use(express.json());
app.use(cors(corsOptions));

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
