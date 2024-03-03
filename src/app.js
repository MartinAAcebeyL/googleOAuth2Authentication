const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const config = require('./configs/config')
const logger = require('./configs/logger')

// shcemas
const User = require('./schemas/users')

// repositories
const UserRepository = require('./repositories/user')
const userRepository = new UserRepository(User)

// use cases
const UserUsecase = require('./usecases/user')
const userUsecase = new UserUsecase(userRepository)

// controllers
const CreateAccountController = require('./controllers/createAccount')
const createAccountController = new CreateAccountController(userUsecase)

// routes
const CreateAccountRouter = require('./routes/createAccount')
const createAccountRouter = new CreateAccountRouter(createAccountController)

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


app.use('/api/v1/user', createAccountRouter.getRouter())

module.exports = app
