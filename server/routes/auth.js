import express from 'express';
import { signin, signout, signup } from '../controller/auth.controller.js';
const router = express.Router();
// import {signup, signin} from '../controllers/auth.js';

router.post('/signup', signup);
router.post('/signin',signin);
router.get('/signout',signout);

export default  router;