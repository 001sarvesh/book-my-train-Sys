const { promisePool } = require('../db/connect');

const bookSeat = async (req, res) => {
    const { trainId, quantity } = req.body;
    const userId = req.user.userId;
    if (!trainId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid input. Please provide trainId and a valid ticket quantity." });
    }
    const connection = await promisePool.getConnection();
    try {
        await connection.query('START TRANSACTION');
        // Lock the train row for updates to prevent race conditions
        const query = `
            SELECT capacity, 
            IFNULL(SUM(booked_seats), 0) AS bookedSeats 
            FROM trains LEFT JOIN bookings 
            ON trains.train_id = bookings.train_id 
            WHERE trains.train_id = ? 
            GROUP BY trains.train_id
            FOR UPDATE
        `;
        const [train] = await connection.execute( query, [trainId]);
        if (train.length === 0) {
            await connection.query('ROLLBACK');
            return res.status(404).json({ message: "Train not found." });
        }
        const availableSeats = train[0].capacity - train[0].bookedSeats;
        if (availableSeats < quantity) {
            await connection.query('ROLLBACK');
            return res.status(400).json({ message: "Not enough seats available." });
        }
        await connection.execute(
            'INSERT INTO bookings (user_id, train_id, booked_seats) VALUES (?, ?, ?)',
            [userId, trainId, quantity]
        );
        await connection.query('COMMIT');
        res.status(201).json({ message: "Booking successful!", bookedSeats: quantity });
    } catch (error) {
        await connection.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: "Server error while processing the booking." });
    } finally {
        // Release DB connection
        connection.release();
    }
};

module.exports = { bookSeat };
