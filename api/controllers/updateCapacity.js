const { promisePool } = require('../db/connect');

const updateCapacity = async (req, res) => {
    const { trainId, newCapacity } = req.body;
    if (!trainId || !newCapacity || newCapacity <= 0) {
        return res.status(400).json({ message: "Invalid input. Please provide a valid trainId and new capacity." });
    }
    try {
        const [train] = await promisePool.execute(
            "SELECT capacity FROM trains WHERE train_id = ?",
            [trainId]
        );
        if (train.length === 0) {
            return res.status(404).json({ message: "Train not found." });
        }
        await promisePool.execute(
            "UPDATE trains SET capacity = ? WHERE train_id = ?",
            [newCapacity, trainId]
        );
        res.status(200).json({ message: `Train capacity updated successfully to ${newCapacity}.` });
    } catch (error) {
        console.error("Error updating train capacity:", error);
        res.status(500).json({ message: "Server error while updating train capacity." });
    }
};

module.exports = { updateCapacity };