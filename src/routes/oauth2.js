class OAuth2Router {
    constructor(oauth2Usecase) {
        this.router = require('express').Router();
        this.oauth2Usecase = oauth2Usecase;
    }

    redirectRouter() {
        const url = '/auth/google';

        this.router.get(
            url, (req, res) => {
                const authorizeUrl = this.oauth2Usecase.makeAuthUrl()
                console.log("authorizeUrl", authorizeUrl)
                res.redirect(authorizeUrl)
            });
        return this.router;
    }

    callbackRouter() {
        const url = '/auth/google/callback';
        this.router.get(url, async (req, res) => {
            try {
                const tokens = await this.oauth2Usecase.obtainTokenOfClient(req)
                const payload = await this.oauth2Usecase.getPayload(tokens);
                this.oauth2Usecase.saveNewUserOnDB(payload, tokens)
                console.info("Authentication successful!")
                res.send('Authentication successful! You can close this tab now.');
            } catch (error) {
                console.error('Error retrieving access token:', error);
                res.status(500).send('Authentication failed');
            }
        });
        return this.router;
    }

    loginSingUp() {
        const url = '/oauth/google/users'
        this.router.get(url, async (req, res) => {
            try {
                const { access_token, refresh_token } = await this.oauth2Usecase.loginOrSingUpUser(req)

                res.status(200).send({
                    access_token, refresh_token
                })
            } catch (error) {
                console.error(error.message)
                res.status(500).send({
                    "message": "something went wrong",
                    "error": error.message
                })
            }
        })
        return this.router;
    }

    getAllRoutes() {
        return this.router;
    }
}

module.exports = OAuth2Router;
