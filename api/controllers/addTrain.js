const { promisePool } = require('../db/connect');

const addTrain = async (req, res) => {
    const { name, date, time, source_station_id, dest_station_id, capacity } = req.body;    
    if (!name || !date || !time || !source_station_id || !dest_station_id || !capacity) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }
    try {
        const [result] = await promisePool.execute(
            'INSERT INTO trains (name, date, time, source_station_id, dest_station_id, capacity) VALUES (?, ?, ?, ?, ?, ?)', 
            [name, date, time, source_station_id, dest_station_id, capacity]
        );
        res.status(201).json({ message: 'Train added successfully', trainId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while adding the train' });
    }
};

module.exports = { addTrain };
