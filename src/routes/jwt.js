class JWTSingInRouter {
    constructor(jwtUsecase) {
        this.router = require('express').Router();
        this.jwtUsecase = jwtUsecase;
    }

    login() {
        const url = '/jwt/login'
        this.router.post(url, async (req, res) => {
            try {
                if(!req.body.email || !req.body.password) {
                    throw new Error("email and password are required")
                }

                const { access_token, refresh_token } = await this.jwtUsecase.login(req)

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

    refreshToken() {
        const url = '/jwt/refresh'
        this.router.post(url, async (req, res) => {
            try {
                if(!req.body.refresh_token) {
                    throw new Error("refresh_token is required")
                }
                const { access_token, refresh_token } = await this.jwtUsecase.refreshToken(req)

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

module.exports = JWTSingInRouter;