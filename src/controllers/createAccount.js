const { transformError, hashPassword } = require('../utils/utils');

class CreateAccountController {
    constructor(userUsecase) {
        this.userUsecase = userUsecase;
    }

    async handle(request, response) {
        try {
            const { name, lastName, phone, email, password } = request.body;
            this.validPassword(password)
            const passwordHash = await hashPassword(password);
            const user = await this.userUsecase.createUser(name, lastName, phone, email, passwordHash);
            return response.status(201).json(user);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return response.status(400).json({
                    message: "Validation error",
                    errors: transformError(error)
                });
            } else {
                return response.status(500).json({
                    message: "Internal server error",
                    error: error.message
                });
            }
        }
    }

    validPassword(password) {
        if (password == undefined) {
            const error = new Error("Password is necessary to create an account by email flow");
            error.name = "ValidationError";
            throw error;
        }
    }
}

module.exports = CreateAccountController;