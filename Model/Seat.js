const mongoose = require('mongoose')
const { Schema } = mongoose

const SeatSchema = new Schema({
  seatNumber: { type: Number, required: true },
  })

const SeatModel = mongoose.model('seat', SeatSchema)

module.exports = { SeatModel }
