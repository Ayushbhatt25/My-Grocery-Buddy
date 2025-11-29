import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Razorpay from 'razorpay';

// Initialize Razorpay
let razorpayInstance;
try {
    razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
} catch (error) {
    console.error("Razorpay initialization failed:", error.message);
}

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, address, items } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        // Calculate total amount
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        amount += Math.floor(amount * 0.02); // Tax

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
            isPaid: false
        });

        return res.json({ success: true, message: "Order placed successfully!" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Place Order Razorpay : /api/order/razorpay
export const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, address, items } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        // Calculate total amount
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        amount += Math.floor(amount * 0.02); // Tax

        if (!razorpayInstance) {
            return res.json({ success: false, message: "Razorpay is not initialized" });
        }

        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpayInstance.orders.create(options);

        const newOrder = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Razorpay",
            isPaid: false
        });

        return res.json({ success: true, order, orderId: newOrder._id });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Verify Razorpay Payment : /api/order/verifyRazorpay
export const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, userId } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const crypto = await import('crypto');
        const expectedSignature = crypto.default.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            await Order.findByIdAndUpdate(orderId, { isPaid: true, paymentType: "Razorpay" });
            await User.findByIdAndUpdate(userId, { cartItems: {} });
            return res.json({ success: true, message: "Payment Verified" });
        } else {
            return res.json({ success: false, message: "Payment Verification Failed" });
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// Get Orders by userId : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        // Include all orders for this user
        const orders = await Order.find({ userId }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get all orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
