const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const { OAUTH_SCOPES } = require("../configs/config")

// Download your OAuth2 configuration from the Google
const keys = require('../service_accounts/oauth2.json');


class OAuth2 {
    constructor(userUsecase) {
        // create an oAuth client to authorize the API call.  Secrets are kept in a `service_account.json` file,
        // which should be downloaded from the Google Developers Console.
        this.client_id = keys.client_id;
        this.oAuth2Client = new OAuth2Client(
            this.client_id,
            keys.client_secret,
            keys.redirect_uris[0]
        );
        this.userUsecase = userUsecase;
    }

    async obtainTokenOfClient(req) {
        const { code } = req.query;
        const { tokens } = await this.oAuth2Client.getToken(code);
        // Now you have the tokens, you can use them to make authenticated requests
        this.oAuth2Client.setCredentials(tokens);
        return tokens;
    }

    async getTokensOfClient(req) {
        const code = req.query.code;
        if (!code) {
            throw new Error("Código de autorización no proporcionado")
        }
        const response = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                code,
                client_id: this.client_id,
                client_secret: keys.client_secret,
                redirect_uri: keys.redirect_uris[1],
                grant_type: 'authorization_code',
            },
        });

        const tokens = response.data;
        this.oAuth2Client.setCredentials(tokens);
        return tokens;
    }

    async getPayload(tokens) {
        const ticket = await this.oAuth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: this.client_id,
        });
        return ticket.getPayload();
    }

    makeAuthUrl() {
        // Generate the url that will be used for the consent dialog.
        return this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: OAUTH_SCOPES.join(' '),
        });
    }

    saveNewUserOnDB(payload, tokens) {
        this.userUsecase.saveNewUserOnDB(payload, tokens)
    }

    async loginOrSingUpUser(req) {
        const tokens = await this.getTokensOfClient(req)
        const payload = await this.getPayload(tokens);
        this.userUsecase.findOrCreateUser(payload, tokens)
        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
        }
    }
}


module.exports = OAuth2