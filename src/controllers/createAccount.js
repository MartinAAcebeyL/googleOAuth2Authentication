class CreateAccountController {
    constructor(userUsecase) {
        console.log('userUsecase', userUsecase);
        this.userUsecase = userUsecase;
        console.log('this.userUsecase', this.userUsecase);
    }

    async handle(request, response) {
        try {
            const { name, email, password } = request.body;
            const user = await this.userUsecase.createUser(name, email, password);
            return response.status(201).json(user);
        } catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
}

module.exports = CreateAccountController;