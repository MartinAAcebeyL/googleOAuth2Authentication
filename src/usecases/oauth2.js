const { OAuth2Client } = require('google-auth-library');
const { OAUTH_SCOPES } = require("../configs/config")

// Download your OAuth2 configuration from the Google
const keys = require('../service_accounts/oauth2.json');


class OAuth2 {
    constructor() {
        // create an oAuth client to authorize the API call.  Secrets are kept in a `service_account.json` file,
        // which should be downloaded from the Google Developers Console.
        this.client_id = keys.client_id;
        this.oAuth2Client = new OAuth2Client(
            this.client_id,
            keys.client_secret,
            keys.redirect_uris[0]
        );
    }

    async obtainTokenOfClient(req) {
        const { code } = req.query;
        const { tokens } = await this.oAuth2Client.getToken(code);
        // Now you have the tokens, you can use them to make authenticated requests
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

}


module.exports = OAuth2