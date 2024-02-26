const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const config = require('./configs/config')
const logger = require('./configs/logger')

// controllers
const CreateAccountController = require('./controllers/createAccount')

// repositories
const UserRepository = require('./repositories/user')

// routes
const createAccountRouter = require('./routes/createAccount')

// shcemas
const User = require('./schemas/users')

// use cases
const CreateAccountService = require('./useCases/createAccount')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(middleware.requestLogger)

// app.use('/api/notes', contactRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app
