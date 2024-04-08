const { OAuth2Client } = require('google-auth-library');
const { OAUTH_SCOPES } = require("../configs/config")

// Download your OAuth2 configuration from the Google
const keys = require('./oauth2.keys.json');


class OAuth2 {
    constructor() {
        // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
        // which should be downloaded from the Google Developers Console.
        this.oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );


        // Now that we have the code, use that to acquire tokens.
        const r = oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        resolve(oAuth2Client);


    }

    makeAuthUrl() {
        // Generate the url that will be used for the consent dialog.
        return this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
        });
    }

}


module.exports = OAuth2