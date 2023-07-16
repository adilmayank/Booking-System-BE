const { SeatModel } = require('../Model/Seat')

class Seat {
  getAllSeats = async () => {
    try {
      const allSeats = await SeatModel.find({})
      return allSeats
    } catch (error) {
      return error
    }
  }
  createSeats = async () => {
    const seats = [
      { seatNumber: 1 },
      { seatNumber: 2 },
      { seatNumber: 3 },
      { seatNumber: 4 },
      { seatNumber: 5 },
      { seatNumber: 6 },
      { seatNumber: 7 },
      { seatNumber: 8 },
      { seatNumber: 9 },
      { seatNumber: 10 },
      { seatNumber: 11 },
      { seatNumber: 12 },
      { seatNumber: 13 },
      { seatNumber: 14 },
      { seatNumber: 15 },
      { seatNumber: 16 },
      { seatNumber: 17 },
      { seatNumber: 18 },
      { seatNumber: 19 },
      { seatNumber: 20 },
      { seatNumber: 21 },
      { seatNumber: 22 },
      { seatNumber: 23 },
      { seatNumber: 24 },
      { seatNumber: 25 },
      { seatNumber: 26 },
      { seatNumber: 27 },
      { seatNumber: 28 },
      { seatNumber: 29 },
      { seatNumber: 30 },
      { seatNumber: 31 },
      { seatNumber: 32 },
      { seatNumber: 33 },
      { seatNumber: 34 },
      { seatNumber: 35 },
      { seatNumber: 36 },
      { seatNumber: 37 },
      { seatNumber: 38 },
      { seatNumber: 39 },
      { seatNumber: 40 },
      { seatNumber: 41 },
      { seatNumber: 42 },
      { seatNumber: 43 },
      { seatNumber: 44 },
      { seatNumber: 45 },
      { seatNumber: 46 },
      { seatNumber: 47 },
      { seatNumber: 48 },
      { seatNumber: 49 },
      { seatNumber: 50 },
      { seatNumber: 51 },
      { seatNumber: 52 },
      { seatNumber: 53 },
      { seatNumber: 54 },
      { seatNumber: 55 },
      { seatNumber: 56 },
      { seatNumber: 57 },
      { seatNumber: 58 },
      { seatNumber: 59 },
      { seatNumber: 60 },
      { seatNumber: 61 },
      { seatNumber: 62 },
      { seatNumber: 63 },
      { seatNumber: 64 },
      { seatNumber: 65 },
      { seatNumber: 66 },
      { seatNumber: 67 },
      { seatNumber: 68 },
      { seatNumber: 69 },
      { seatNumber: 70 },
      { seatNumber: 71 },
      { seatNumber: 72 },
      { seatNumber: 73 },
      { seatNumber: 74 },
      { seatNumber: 75 },
      { seatNumber: 76 },
      { seatNumber: 77 },
      { seatNumber: 78 },
      { seatNumber: 79 },
      { seatNumber: 80 },
    ]
    try {
      await SeatModel.insertMany(seats)
    } catch (error) {}
  }
}

module.exports = Seat
