require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { router: BookingRouter } = require('./Router/Booking')

const PORT = process.env.PORT || 5000
const MONGO_USERNAME = process.env.MONGODB_USERNAME
const MONGO_PASSWORD = process.env.MONGODB_PASSWORD
const CONNECTION_STRING = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.zhbk7gt.mongodb.net/?retryWrites=true&w=majority`


// adding localhost and deployed front end origin for cors policy
app.use(
  cors({
    origin: [
      'https://booking-system-fe-oz52.onrender.com',
      'http://localhost:5173',
    ],
  })
)

app.use(express.json())

app.use(BookingRouter)

app.listen(PORT, async () => {
  try {
    await mongoose.connect(CONNECTION_STRING)
    console.log(`Connected to DB. Listening to port: ${PORT}`)
  } catch (error) {
    console.log(error)
  }
})
