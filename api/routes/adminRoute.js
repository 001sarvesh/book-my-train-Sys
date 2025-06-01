const express = require('express');
const { addTrain } = require('../controllers/addTrain');
const { updateCapacity } = require('../controllers/updateCapacity');
const { registerAdmin } = require('../controllers/registerAdmin');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Admin-only routes that require authentication and admin privileges
router.post('/register-admin', authenticate, isAdmin, registerAdmin);
router.post('/add-train', authenticate, isAdmin, addTrain);
router.put('/update-capacity', authenticate, isAdmin, updateCapacity);

module.exports = router;
