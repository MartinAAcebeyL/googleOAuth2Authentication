class CreateAccountRouter {
    constructor(accountController) {
        this.accountController = accountController;
        this.createAccountRouter = require('express').Router();
    }

    getRouter() {
        this.createAccountRouter.post('/createAccount/123', this.accountController.handle);
        return this.createAccountRouter;
    }
}

module.exports = CreateAccountRouter;
