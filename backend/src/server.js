import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';   
import rateLimiter from './middleware/rateLimiter.js';     
dotenv.config(); // Load environment variables from .env file

const app=express();
const PORT=process.env.PORT || 5001;



//middleware
app.use(express.json());
app.use(rateLimiter)

app.use("/api/notes",notesRoutes);
connectDB().then(()=>{
    app.listen(PORT,()=>{
      console.log("server started in port",PORT);
    });
});

