import express, { application } from 'express';
import {
    ClientSignUp
} from '../controllers/clientAuthC.js';
import {requireAuth} from '../middleware/requireAuth.js'

const router = express.Router();

// router.use(requireAuth)
router.post('/signup', ClientSignUp);

export default router;