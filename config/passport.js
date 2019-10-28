const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const bcrypt = require('bcryptjs')

const EXPIRED = "1d"
const SECRET = "akuntansivoxel"
const ALGO = "HS256"
const ISSUER = "voxelsoftware.co"
const AUDIENCE = "voxelsoftware.co"

const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
}

const JWT_STRATEGY_CONFIG = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
    issuer: ISSUER,
    audience: AUDIENCE,
    passReqToCallback: false
}

_onLocalStrategyAuth = (email, password, next) => {
    User.findOne({
        email: email
    })
    .exec((error, user) => {
        if(error) return next(error, false, {})
        
        if(!user) return next(error, false, {
            code: 'E_USER_NOT_FOUND',
            message: `user with email ${email} not found`
        })

        const valid = bcrypt.compareSync(password, user.password)
        if(!valid) return next(null, false, {
            code: 'E_WRONG_PASSWORD',
            message: `password did not match with ${email}`
        })

        return next(null, user, {})
    })
}

_onJwtStrategyAuth = (payload, next) => {
    const user = payload.user
    return next(null, user, {})
}

passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth))
passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth))

module.exports.jwtSettings = {
    expires: EXPIRED,
    secret: SECRET,
    algorithm: ALGO,
    issuer: ISSUER,
    audience: AUDIENCE
}