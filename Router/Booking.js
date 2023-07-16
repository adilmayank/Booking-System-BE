const express = require('express')
const router = express.Router()

const Booking  = require('../Controller/Booking')
const BookingController = new Booking()


// get booking details
router.get('/api/v1/booking', BookingController.getBookingInfo)

// book tickets
router.post('/api/v1/booking', BookingController.bookTickets)

// remove all bookings
router.delete("/api/v1/booking", BookingController.removeBookings)


// router.get('/api/v1/createUsers', booking.createUsers)

module.exports = {router}
