import express from 'express';
import { sendOtp, signin, verifyOtpAndSignup } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/sendotp',sendOtp);
router.post('/signup',verifyOtpAndSignup);
router.post('/signin',signin);


export default  router;