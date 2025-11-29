import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderRazorpay, verifyRazorpay } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);

orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default orderRouter;