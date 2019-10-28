const jwt = require('jsonwebtoken')

module.exports = {
    secret: sails.config.jwtSettings.secret,
    issuer: sails.config.jwtSettings.issuer,
    audience: sails.config.jwtSettings.audience,
    createToken: (user) => {
        const data = {
            id: user.id,
            email: user.email
        }
        return jwt.sign({
            user: data
        },
        sails.config.jwtSettings.secret,
        {
            algorithm: sails.config.jwtSettings.algorithm,
            expiresIn: sails.config.jwtSettings.expires,
            issuer: sails.config.jwtSettings.issuer,
            audience: sails.config.jwtSettings.audience
        })
    }
}