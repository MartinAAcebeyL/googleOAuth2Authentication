const app = express()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const config = require('./configs/config')
const logger = require('./configs/logger')

// shcemas
const User = require('./schemas/users')

// repositories
const UserRepository = require('./repositories/user')
const userRepository = new UserRepository(User)

// use cases
const UserUsecase = require('./usecases/user')
const OAuth2 = require("./usecases/oauth2")

const userUsecase = new UserUsecase(userRepository)
const oauth2Usecase = new OAuth2()

// controllers
const CreateAccountController = require('./controllers/createAccount')
const createAccountController = new CreateAccountController(userUsecase)

// routes
const CreateAccountRouter = require('./routes/createAccount')
const OAuth2Router = require("./routes/oauth2")

const createAccountRouter = new CreateAccountRouter(createAccountController)
const oauth2Router = new OAuth2Router();


mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB on ', config.MONGODB_URI)
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use('/api/v1/user', createAccountRouter.getAllRoutes())
app.use('/api/v1/', oauth2Router.getAllRoutes())

module.exports = app
