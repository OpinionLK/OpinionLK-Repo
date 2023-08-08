import express, { application } from 'express';
import {
    SignUp,
    Login
} from '../controllers/authC.js';

import {
    ClientSignUp,
    ClientLogin
} from '../controllers/clientAuthC.js';



console.log('auth.js');

const router = express.Router();
router.post('/signup', SignUp);
router.post('/login', Login);

router.post('/client/signup', ClientSignUp);
router.post('/client/login', ClientLogin);


export default router;