const createAccountRouter = require('express').Router();
const { createAccount } = require('../controllers/createAccount');

createAccountRouter.post('/', createAccount);

module.exports = createAccountRouter;
