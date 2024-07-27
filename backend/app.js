const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');

app.use(express.json());

app.get('/',async(req,res)=>{
    res.send('Project starter');
})


const port = process.env.PORT || 5000;
console.log(process.env.MONGO_URI);
console.log(process.env.PORT);
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to the database");
        app.listen(port,()=>console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();
