class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    async createUserByEmail(name, lastName, phone, email, password) {
        const user = await this.userRepository.createNewUserByEmail(name, lastName, phone, email, password)
        return user
    }

    async createUserByOauth2(name, lastName, email, access_token, refresh_token, id_token) {
        const user = await this.userRepository.createNewUserByOauth2(name, lastName, email, access_token, refresh_token, id_token)
        return user
    }
}

module.exports = UserUsecase