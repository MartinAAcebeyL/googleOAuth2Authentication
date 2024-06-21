class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository
    }
    async createUserByEmail(name, lastName, phone, email, password, isInstitute) {
        const user = await this.userRepository.createNewUserByEmail(name, lastName, phone, email, password, isInstitute)
        return user
    }

    async createUserByOauth2(name, lastName, email, access_token, refresh_token, id_token, googleID) {
        const user = await this.userRepository.createNewUserByOauth2({ name, lastName, email, access_token, refresh_token, id_token, googleID })
        return user
    }

    async getUserByGoogleId(googleId) {
        return await this.userRepository.getUserByGoogleId(googleId)
    }
    saveNewUserOnDB(payload, tokens) {
        const { sub: googleID, email, given_name, family_name } = payload;
        const { access_token, refresh_token, id_token } = tokens;

        this.createUserByOauth2(given_name, family_name, email, access_token, refresh_token, id_token, googleID)
    }

    async findOrCreateUser(payload, tokens) {
        const googleID = payload.sub;
        try {
            let user = await this.getUserByGoogleId(googleID);
            if (!user) {
                this.saveNewUserOnDB(payload, tokens)
                return false
            }
            this.userRepository.updateUserGoogleInfo(user, tokens);
            return true
        } catch (error) {
            console.error('Error finding or creating user:', error);
            throw error;
        }
    }
}

module.exports = UserUsecase