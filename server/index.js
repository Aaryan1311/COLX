import express from 'express'
import dotenv from 'dotenv';
dotenv.config();

//connect to db
connectDB();

// port
const port = 3000;

// rest object 
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser)



app.get('/', (req,res) =>{
    res.send('Hello');
})

app.listen(3000,()=>{
    console.log(`App listening on port 3000`)
})

