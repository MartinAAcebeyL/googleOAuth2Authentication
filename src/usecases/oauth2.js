const { OAuth2Client } = require('google-auth-library');
const { OAUTH_SCOPES } = require("../configs/config")

// Download your OAuth2 configuration from the Google
const keys = require('../service_accounts/service_account.json');

class OAuth2 {
    constructor() {
        // create an oAuth client to authorize the API call.  Secrets are kept in a `service_account.json` file,
        // which should be downloaded from the Google Developers Console.
        this.oAuth2Client = new OAuth2Client(
            keys.client_id,
            keys.client_secret,
        );
    }

    async obtainTokenOfClient(req) {
        const { code } = req.query;
        const { tokens } = await oAuth2Client.getToken(code);
        // Now you have the tokens, you can use them to make authenticated requests
        oAuth2Client.setCredentials(tokens);
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