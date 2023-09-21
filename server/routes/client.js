import express, { application } from 'express';
import {
    ClientSignUp,
    ClientData,
} from '../controllers/clientAuthC.js';

import {requireAuth} from '../middleware/requireAuth.js'

const router = express.Router();


router.post('/signup', ClientSignUp);
router.get('/clientdata', ClientData);




export default router;