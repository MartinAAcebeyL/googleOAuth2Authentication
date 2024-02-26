class CreateAccountController {
    async handle(request, response) {
        const { name, email, password } = request.body;

        const createAccountService = new CreateAccountService();
        const user = await createAccountService.execute({ name, email, password });

        return response.json(user);
    }
}

export default CreateAccountController;