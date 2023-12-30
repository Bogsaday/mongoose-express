require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')


mongoose.connect("mongodb+srv://testuser:testuser@cluster0.640onrp.mongodb.net/testdb").then(() => console.log("Connected to mongodb")).catch((err) => console.log(err))


const app = express()
app.use(express.json())


// use rroute
app.use('/api/v1/user', userRoute)

app.listen(5000, console.log("Server on port 5000"))