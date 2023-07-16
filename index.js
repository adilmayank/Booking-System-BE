require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { router: BookingRouter } = require('./Router/Booking')

const PORT = 5000

app.use(cors())

app.use(express.json())

app.use(BookingRouter)

app.listen(PORT, async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://adilmayank5894:${process.env.MONGODB_PASSWORD}@cluster0.zhbk7gt.mongodb.net/?retryWrites=true&w=majority`
    )
    console.log(`Connected to DB. Listening to port: ${PORT}`)
  } catch (error) {
    console.log(error)
  }
})
