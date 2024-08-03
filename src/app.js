const express = require('express')
const app = express()
const cors = require('cors')
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
const JWTSingInUsecase = require('./usecases/jwt')

const userUsecase = new UserUsecase(userRepository)
const oauth2Usecase = new OAuth2(userUsecase)
const jwtUsecase = new JWTSingInUsecase(userRepository)

// controllers
const CreateAccountController = require('./controllers/createAccount')
const createAccountController = new CreateAccountController(userUsecase)

// routes
const CreateAccountRouter = require('./routes/createAccount')
const OAuth2Router = require("./routes/oauth2")
const JWTSingInRouter = require('./routes/jwt')

const createAccountRouter = new CreateAccountRouter(createAccountController)
const oauth2Router = new OAuth2Router(oauth2Usecase);
const jwtSingInRouter = new JWTSingInRouter(jwtUsecase);

const startUrl = '/api/v1';

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

app.use(`${startUrl}/user`, createAccountRouter.createAccountRoute())
app.use(startUrl, oauth2Router.redirectRouter())
app.use(startUrl, oauth2Router.callbackRouter())
app.use(startUrl, oauth2Router.loginSingUp())
app.use(startUrl, jwtSingInRouter.login())
app.use(startUrl, jwtSingInRouter.refreshToken())

module.exports = app
