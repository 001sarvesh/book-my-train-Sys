const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const api = express();
const cors = require('cors');
const PORT = process.env.PORT || 8787;

const connectDB = require("./api/db/connect");
const userRoute = require("./api/routes/userRoute");
const adminRoute = require("./api/routes/adminRoute");
const trainInfoRoute = require('./api/routes/trainInfoRoute');

api.use(express.json());
api.use(cors());
api.use('/api/users', userRoute);
api.use('/api/train-info', trainInfoRoute);
api.use('/api/admin', adminRoute);

api.get("/", (req, res) => {
    res.send("Hii");
});

const start = async () => {
    try {
        // Test database connection first
        const { pool } = connectDB;
        await new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error("Database connection failed:", err);
                    reject(err);
                    return;
                }
                console.log("Database connection established!");
                connection.release();
                resolve();
            });
        });

        // Only start server if database connection is successful
        api.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

start();