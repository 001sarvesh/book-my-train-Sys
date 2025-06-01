const { promisePool } = require('../db/connect');

const getBookingDetails = async (req, res) => {
    const userId = req.user.userId;
    try {
        const query = `
            SELECT 
                b.booking_id, 
                b.booked_seats, 
                t.train_id,
                t.name AS train_name, 
                t.date, 
                t.time, 
                src.name AS source_station, 
                dest.name AS destination_station
            FROM bookings b
            JOIN trains t ON b.train_id = t.train_id
            JOIN stations src ON t.source_station_id = src.station_id
            JOIN stations dest ON t.dest_station_id = dest.station_id
            WHERE b.user_id = ?
            ORDER BY t.date DESC;
        `;
        const [bookings] = await promisePool.execute(query, [userId]);
        if (bookings.length === 0) {
            return res.status(200).json({ message: "No bookings found.", bookings: [] });
        }
        res.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ message: "Server error while fetching bookings." });
    }
};

module.exports = { getBookingDetails };
