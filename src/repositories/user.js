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
}

module.exports = UserRepository;
