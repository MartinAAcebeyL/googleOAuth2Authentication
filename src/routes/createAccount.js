class CreateAccountRouter {
    constructor(accountController) {
        this.accountController = accountController;
        this.createAccountRouter = require('express').Router();
    }

    createAccountRoute() {
        const url = '/createAccount/';
        this.createAccountRouter.post(
            url, (req, res) => {
                this.accountController.handle(req, res)
            });
        return this.createAccountRouter;
    }

    getAllRoutes() {
        return this.createAccountRouter;
    }
}

module.exports = CreateAccountRouter;
