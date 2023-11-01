import express, { application } from 'express';
import {
    SignUp,
    SignUp2,
    Login,
    sendmail
} from '../controllers/authC.js';

import{
    Getmembers,
    Savemember,
    Updatemember,
    Deletemember
}from '../controllers/AddMemberC.js';

const router = express.Router();

router.post('/signup', SignUp);
router.post('/signup2', SignUp2);
router.post('/login', Login);
router.post('/sendEmail', sendmail);

router.get('/getmembers', Getmembers);
router.post('/savemember', Savemember);
router.put('/updatemember/:id', Updatemember);
router.delete('/deletemember/:id', Deletemember);


export default router;