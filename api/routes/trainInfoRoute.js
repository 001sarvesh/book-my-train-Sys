const express = require('express');
const { getSeatAvailability } = require('../controllers/getSeatAvailability');
const { bookSeat } = require('../controllers/bookSeat');
const { getBookingDetails } = require('../controllers/getBookingDetails');
const { authenticate } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get('/seat-availability', authenticate, getSeatAvailability);
router.post('/book-seats', authenticate, bookSeat);
router.get('/get-booking-details', authenticate, getBookingDetails);

module.exports = router;
