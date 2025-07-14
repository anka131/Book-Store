import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
// middleware
app.use(express.json());

app.use(cors());


app.use("/books", booksRoute);

app.get("/", (req,res) => {
    console.log(req);
    return res.status(234).send("Hello, welcome");
    
})
// Setting up database and only running port if there is no error
mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
})
.catch((err)=> {
    console.log(err.message);
});


