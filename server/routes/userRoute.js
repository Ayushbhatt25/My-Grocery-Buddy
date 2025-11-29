import express from 'express';
import { register, login, isAuth, logout, googleLogin } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/google-login', googleLogin);
userRouter.get('/is-auth', authUser, isAuth);
userRouter.get('/logout', logout);


export default userRouter;