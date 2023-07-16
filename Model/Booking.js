const mongoose = require('mongoose')
const { Schema } = mongoose

const BookingSchema = new Schema({
  bookedSeatIndex: { type: Number, required: true },
  reservedAt: { type: Date, default: Date.now(), required: true },
})

const BookingModel = mongoose.model('booking', BookingSchema)

module.exports = { BookingModel }
