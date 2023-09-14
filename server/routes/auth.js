import express, { application } from 'express';
import {
    SignUp,
    Login
} from '../controllers/authC.js';

import{
    Getmembers,
    Savemember,
    Updatemember,
    Deletemember
}from '../controllers/AddMemberC.js';

const router = express.Router();

router.post('/signup', SignUp);
router.post('/login', Login);

router.get('/getmembers', Getmembers);
router.post('/savemember', Savemember);
router.put('/updatemember/:id', Updatemember);
router.delete('/deletemember/:id', Deletemember);

export default router;