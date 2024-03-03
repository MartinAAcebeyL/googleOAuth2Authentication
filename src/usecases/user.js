class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    async createUser({ name, email, password }) {
        const user = await this.userRepository.createNewUser({ name, email, password })
        return user
    }
}

module.exports = UserUsecase