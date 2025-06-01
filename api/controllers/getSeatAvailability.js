const { promisePool } = require('../db/connect');

const getSeatAvailability = async (req, res) => {
    const { source, destination, date, time } = req.query;
    if (!source || !destination) {
        return res.status(400).json({ message: 'Please provide source and destination station.' });
    }
    try {
        let query = `
            SELECT t.train_id, t.name, t.date, t.time, t.capacity,
            IFNULL(SUM(b.quantity), 0) AS booked_seats
            FROM trains t
            LEFT JOIN bookings b ON t.train_id = b.train_id
            WHERE t.source_station_id = (SELECT station_id FROM stations WHERE name = ?)
            AND t.dest_station_id = (SELECT station_id FROM stations WHERE name = ?)
        `;
        const params = [source, destination];
        if (date) {
            query += ' AND t.date = ?';
            params.push(date);
        }
        if (time) {
            query += ' AND t.time = ?';
            params.push(time);
        }
        query += ' GROUP BY t.train_id';

        const [trains] = await promisePool.execute(query, params);
        if (!trains || trains.length === 0) {
            // console.log('Parameters:', params);
            return res.status(404).json({ message: 'No trains found for the given source and destination.' });
        }
        const trainAvailability = trains.map(train => {
            const availableSeats = train.capacity - train.booked_seats;
            return {
                trainId: train.train_id,
                name: train.name,
                date: train.date,
                time: train.time,
                availableSeats,
                bookedSeats: train.booked_seats,
            };
        });
        res.status(200).json({ trains: trainAvailability });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching seat availability' });
    }
};

module.exports = { getSeatAvailability };
