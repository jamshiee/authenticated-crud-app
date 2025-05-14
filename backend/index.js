import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/route.js';
import { dbConnect } from './lib/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5051;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: "https://glistening-scone-f04f46.netlify.app/", 
    credentials:true,
}));
app.use('/',routes)


app.listen(PORT,()=>{
    dbConnect();
    console.log(`Listening On ${PORT}`)
})