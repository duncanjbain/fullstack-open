const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use('/api/blogs',notesRouter)

const PORT = config.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})