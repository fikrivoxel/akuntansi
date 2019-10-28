const passport = require('passport')

module.exports = (req, res, next) => {
    passport.authenticate('jwt', (error, user, info) => {
        if(error) return res.serverError({
            status: 'failed',
            message: error.message
        })

        if(!user) return res.unAuthorizedResponse({
            status: 'failed',
            message: `You are not authorized. Missing or invalid token`
        })

        req.user = user

        next()
    })(req, res, next)
}