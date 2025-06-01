const bcrypt = require("bcryptjs");
const { promisePool } = require('../db/connect');

const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if email already exists
        const [existingUser] = await promisePool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new admin user
        const [result] = await promisePool.execute(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)', 
            [email, hashedPassword, 'admin']
        );

        res.status(201).json({ 
            message: 'Admin user created successfully',
            userId: result.insertId
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Server error while creating admin' });
    }
};

module.exports = { registerAdmin }; 