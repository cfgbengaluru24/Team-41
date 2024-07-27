const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/connect');
const studentRoutes = require('./routes/studentRoutes');
const donorRoutes = require('./routes/money_donor')
const storeManagerRoutes = require('./routes/storeManagerRoutes');
const clothDonorRoutes = require('./routes/clothDonorRoutes');

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    res.send('Project starter');
});

const port = process.env.PORT || 5050;

app.use('/api/students', studentRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/v1/storeManager',storeManagerRoutes);
app.use('/api/v1/clothDonor',clothDonorRoutes);
app.use('/api/mail', mailRoutes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to the database");
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();