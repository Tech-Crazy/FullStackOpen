const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controller/blogs')

console.log("Connecting to MongoDB URI")

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
.then(() => {
    console.log("Connected to MongoDB URI")
})
.catch((error) => {
    console.log("Error encountered. Details: ", error)
})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api', blogsRouter)

module.exports = app