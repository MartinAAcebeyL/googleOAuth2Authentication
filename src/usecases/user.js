class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    async createUser(name, lastName, phone, email, password) {
        const user = await this.userRepository.createNewUser(name, lastName, phone, email, password)
        return user
    }
}

module.exports = UserUsecase