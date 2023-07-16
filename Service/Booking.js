const { BookingModel } = require('../Model/Booking')

class Booking {
  static NUMBER_OF_SEATS_IN_COACH = 80
  static NUMBER_OF_ROWS_IN_COACH = Math.ceil(
    Booking.NUMBER_OF_SEATS_IN_COACH / 7
  )

  // get booking info which is nothing but an array of 0s and 1s representing seat availability status
  getBookingInfo = async () => {
    try {
      const availabilityStatus = await this.getRowWiseAvailabilityMap()
      let flattenedAvailabilityStatus = []
      availabilityStatus.map((item) => {
        flattenedAvailabilityStatus = [
          ...flattenedAvailabilityStatus,
          ...item['rowValues'],
        ]
      })
      return flattenedAvailabilityStatus
    } catch (error) {
      throw new Error(error)
    }
  }

  getBookedSeats = async () => {
    try {
      const bookedSeats = await BookingModel.find({}).select('bookedSeatIndex')
      return bookedSeats
    } catch (error) {
      throw new Error(error)
    }
  }

  // entry point of seat booking algorithm
  bookSeats = async (numOfSeatsToBook) => {
    // here we actually find the indices of seat being booked for the current request.
    try {
      const seatNumbersToBook = []
      const rowWiseAvailabilityMap = await this.getRowWiseAvailabilityMap()
      const bookingPlan = await this.getRequestedSeats(
        numOfSeatsToBook,
        rowWiseAvailabilityMap
      )

      // Part 4 of Seat Booking Algorithm
      let seatsLeftToBook = numOfSeatsToBook
      for (let item of bookingPlan) {
        const { rowValues, numOfSeatsBeingBooked, rowIndex } = item
        for (let i = 0; i < rowValues.length; i++) {
          if (seatsLeftToBook > 0) {
            if (rowValues[i] === 1) {
              seatNumbersToBook.push({ bookedSeatIndex: 7 * rowIndex + i })
              seatsLeftToBook--
            }
          }
        }
      }
      await BookingModel.insertMany(seatNumbersToBook)
      return { seatNumbersToBook, seatsLeftToBook }
    } catch (error) {
      throw new Error(error)
    }
  }

  // Part 3 of Seat Booking Algorithm
  getRequestedSeats = async (numOfSeatsToBook, rowWiseAvailabilityMap) => {
    try {
      let seatsLeftToBook = numOfSeatsToBook
      const bookingPlan = []

      // first pass over all the rows to see whether there are any rows in which all of the
      // requested seats can be booked

      for (let row of rowWiseAvailabilityMap) {
        const { rowIndex, rowValues, numOfAvailableSeats } = row

        if (numOfAvailableSeats >= seatsLeftToBook) {
          bookingPlan.push({
            rowIndex,
            rowValues,
            numOfSeatsBeingBooked: seatsLeftToBook,
          })
          seatsLeftToBook = 0
          return bookingPlan
        }
      }

      // second pass in case there are no rows in which all the requested seats can be booked
      for (let row of rowWiseAvailabilityMap) {
        if (seatsLeftToBook > 0) {
          const { rowIndex, rowValues, numOfAvailableSeats } = row
          bookingPlan.push({
            rowIndex,
            rowValues,
            numOfSeatsBeingBooked: numOfAvailableSeats,
          })
          seatsLeftToBook -= numOfAvailableSeats
        }
      }
      return bookingPlan
    } catch (error) {
      throw new Error(error)
    }
  }

  // Part 2 of seat booking algorithm
  // returns a mapping array of 0s and 1s, 0s for Booked and 1s for Available seats
  getRowWiseAvailabilityMap = async () => {
    try {
      const rowWiseAvailabilityMap = []

      // assuming all the seats at start were available
      const availabilityMap = new Array(Booking.NUMBER_OF_SEATS_IN_COACH).fill(
        1
      )

      // get booked seats from database
      const bookedSeats = await this.getBookedSeats()
      // since booked seats are actual indices of seats, we look up the booked seat index in availability map array and mark element at that position
      // as 0 i.e. booked
      for (let bookedSeat of bookedSeats) {
        const { bookedSeatIndex } = bookedSeat
        availabilityMap[bookedSeatIndex] = 0
      }

      // iterate over each row number, and create an array which has availability layout that row
      for (let i = 0; i < Booking.NUMBER_OF_ROWS_IN_COACH; i++) {
        const rowValues = []
        let numOfAvailableSeats = 0
        // iterate over each row index and use row and column index to find the actual position in the flat row
        // like done in an m x n matrix, for an element in the matrix to find its position in flat array representation of the matrix
        for (let j = 0; j < 7; j++) {
          const seatIndex = 7 * i + j
          const seatAvailability = availabilityMap[seatIndex]
          if (seatAvailability === 1) {
            numOfAvailableSeats++
          }
          // as soon as value at seat index in availability map > 80, break
          else if (seatAvailability === undefined) {
            break
          }
          rowValues.push(seatAvailability)
        }
        // when availability layout for each row is prepared, create an object, representing row availability, row index, and number of available seats
        rowWiseAvailabilityMap.push({
          rowValues,
          rowIndex: i,
          numOfAvailableSeats,
        })
      }
      return rowWiseAvailabilityMap
    } catch (error) {
      throw new Error(error)
    }
  }

  removeBookings = async () => {
    try {
      await BookingModel.deleteMany({})
      return
    } catch (error) {
      throw new Error('Error occured while removing bookings! Try Again.')
    }
  }
}

module.exports = { Booking }
