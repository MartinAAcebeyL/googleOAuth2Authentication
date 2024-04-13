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

        this.router.get(url, (req, res) => {
            try {
                console.log("callback")
                this.oauth2Usecase.obtainTokenOfClient(req)
                console.info("Authentication successful!")
                res.send('Authentication successful! You can close this tab now.');
            } catch (error) {
                console.error('Error retrieving access token:', error);
                res.status(500).send('Authentication failed');
            }
        });
        return this.router;
    }

    getAllRoutes() {
        return this.router;
    }
}

module.exports = OAuth2Router;
