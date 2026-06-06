import mongoose from 'mongoose';


const connectDB = async () => {
    try{
        mongoose.connection.on('connected', () => {
            console.log('Database Connected')
        });
        const uri = process.env.MONGODB_URI.endsWith('/')
            ? `${process.env.MONGODB_URI}greencart`
            : `${process.env.MONGODB_URI}/greencart`;
        await mongoose.connect(uri);
    }
    catch(error){
        console.error(error.message);
    }
}

export default connectDB;