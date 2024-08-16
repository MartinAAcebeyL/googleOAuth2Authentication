const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const { JWT_SECRET, ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } = require('../utils/constants');

class JWTSingInUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(req) {
        const { email, password } = req.body;
        const user = await this.userRepository.getUserByEmail(email);
        await this.validateUser(user, password);

        const payload = this.makePayload(user);
        const { access_token, refresh_token } = this.getTokens(payload);

        return {
            access_token,
            refresh_token
        };
    }

    async refreshToken(req) {
        const token = req.body.refresh_token;
        const payload = jwt.verify(token, JWT_SECRET);
        const { exp, ...newPayload } = payload;
        const { access_token, refresh_token } = this.getTokens(newPayload);

        return {
            access_token,
            refresh_token
        };
    }

    getTokens(payload) {
        const token = jwt.sign(payload, JWT_SECRET, this.getJWTHeaders(ACCESS_TOKEN_TIME));
        const refreshToken = jwt.sign(payload, JWT_SECRET, this.getJWTHeaders(REFRESH_TOKEN_TIME));

        return {
            access_token: token,
            refresh_token: refreshToken
        };
    }

    getJWTHeaders(expiresIn) {
        return { algorithm: 'HS256', expiresIn };
    }

    makePayload(user) {
        return {
            user_id: user.id,
            email: user.email,
            isInstitute: user.isInstitute,
            is_complete_info: user.is_complete_info
        };
    }

    async validateUser(user, password) {
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
    }
}

module.exports = JWTSingInUsecase;
