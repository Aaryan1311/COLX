import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter  from './routes/auth.js';
import productRouter from './routes/product.js';
import cookieParser from 'cookie-parser';
dotenv.config();

//connect to db
connectDB();

// port
const port = 3000;

// rest object 
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());



app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);


app.listen(3000,()=>{
    console.log(`App listening on port 3000`)
})

