class CreateAccountRouter {
    constructor(accountController) {
        this.accountController = accountController;
        this.createAccountRouter = require('express').Router();
    }

    getRouter() {
        this.createAccountRouter.post('/createAccount/', (req, res) => this.accountController.handle(req, res));
        return this.createAccountRouter;
    }
}

module.exports = CreateAccountRouter;
