import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 8000;

connectDB();
connectCloudinary();

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://my-grocery-buddy.vercel.app',
    'https://my-grocery-buddy-l0cwln1dr-ayushbhatt25s-projects.vercel.app/'
];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ""));
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const cleanedOrigin = origin.replace(/\/$/, "");
        const isAllowed = allowedOrigins.includes(cleanedOrigin) ||
            (cleanedOrigin.endsWith('.vercel.app') && cleanedOrigin.includes('ayushbhatt25s-projects'));

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    }
}));

// API Endpoints
app.get('/', (req, res) => res.send('API is working!'));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
    console.log(`PORT connected on ${port}`);
})