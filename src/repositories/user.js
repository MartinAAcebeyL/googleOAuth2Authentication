class UserRepository {
    constructor(User) {
        this.User = User;
    }

    async createNewUserByEmail(name, lastName, phone, email, password, isInstitute = false) {
        const user = await this.User.create(
            { name, lastName, phone, email, password, isInstitute }
        );
        return user;
    }

    async createNewUserByOauth2(
        {
            name,
            lastName,
            email,
            access_token,
            refresh_token,
            id_token,
            googleID,
            isInstitute = false
        }
    ) {
        const loginType = "oauth2"
        const user = await this.User.create(
            { name, lastName, email, access_token, refresh_token, id_token, loginType, isInstitute, googleID }
        );
        return user;
    }

    async getUserByEmail(email) {
        return await this.User.findOne({ email });
    }

    async getUserByGoogleId(googleId) {
        return await this.User.findOne({ googleID: googleId });
    }

    async updateUserGoogleInfo(user, tokens) {
        try {
            user.access_token = tokens.access_token;
            user.refresh_token = tokens.refresh_token;
            user.id_token = tokens.id_token;
            await user.save();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;
