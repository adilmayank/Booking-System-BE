const { Booking: BookingService } = require('../Service/Booking')

const bookingService = new BookingService()

class Booking {

  // controller for get booking info
  getBookingInfo = async (req, res) => {
    try {
      const bookingInfo = await bookingService.getBookingInfo()
      res.status(200).json({ value: bookingInfo })
    } catch (error) {
      res.status(500).json({ value: null, error: true, msg: error.message })
    }
  }

  // manages high level validation and response handling at controller level
  bookTickets = async (req, res) => {
    try {
      const { numOfSeatsToBook } = req.body
      if (numOfSeatsToBook > 7) {
        res.status(400).json({
          value: null,
          error: true,
          msg: 'User can not book more than 7 seats in one request.',
        })
      } else {

        // passing number of seats requested by user as argument to the core booking algorithm, which books the seats and return number of seats which weren't booked
        const { seatsLeftToBook } = await bookingService.bookSeats(
          numOfSeatsToBook
        )

        const bookingInfo = await bookingService.getBookingInfo()
        if (seatsLeftToBook > 0) {
          res
            .status(200)
            .json({
              value: bookingInfo,
              alert: `${seatsLeftToBook} seats are in waiting list.`,
            })
        } else {
          res.status(200).json({ value: bookingInfo })
        }
      }
    } catch (error) {
      res.status(500).json({ value: null, error: true, msg: error.message })
    }
  }

  // controller to control remove booking utility
  removeBookings = async (req, res) => {
    try {
      await bookingService.removeBookings()
      await this.getBookingInfo(req, res)
    } catch (error) {
      res.status(500).json({ value: null, error: true, msg: error.message })
    }
  }
}

module.exports = Booking
