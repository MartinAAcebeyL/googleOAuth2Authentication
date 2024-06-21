class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    async createUserByEmail(name, lastName, phone, email, password, isInstitute) {
        const user = await this.userRepository.createNewUserByEmail(name, lastName, phone, email, password, isInstitute)
        return user
    }

    async createUserByOauth2(name, lastName, email, access_token, refresh_token, id_token, googleID) {
        const user = await this.userRepository.createNewUserByOauth2({name, lastName, email, access_token, refresh_token, id_token, googleID})
        return user
    }
}

module.exports = UserUsecase