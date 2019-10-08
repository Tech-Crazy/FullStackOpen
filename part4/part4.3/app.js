const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./controller/Users')
const blogRouter = require('./controller/Blogs')
const loginRouter = require('./controller/Login')
const config = require('./utils/config')

console.log(`Connecting to MongoDB on PORT ${config.PORT}`)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("Error encountered! Details:", error))

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/login', loginRouter)

module.exports = app