import express from 'express'
import { login, logOut, isUserAuthenticate } from '../../client/src/controller/authController.js'
import { UserAuth } from '../../client/src/middleware/userAuth.js';

export const authRouter = express.Router();

// authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logOut);
// authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
// authRouter.post('/verify-account', userAuth, verifyOtp);
authRouter.get('/is-auth', UserAuth, isUserAuthenticate);
// authRouter.post('/send-reset-otp', sendResetOtp);
// authRouter.post('/verify-reset-otp', verifyResetOtp);
// authRouter.post('/reset-password', resetPassword);

