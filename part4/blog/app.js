const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('connected to MongoDB', mongoUrl)
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})


app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)
app.use('/api/users', usersRouter)

module.exports = app