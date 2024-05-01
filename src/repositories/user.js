class UserRepository {
    constructor(User) {
        this.User = User;
    }

    async createNewUser(name, lastName, phone, email, password, loginType = "email", isInstitute = false) {
        const user = await this.User.create(
            { name, lastName, phone, email, password, loginType, isInstitute }
        );
        return user;
    }
}

module.exports = UserRepository;
