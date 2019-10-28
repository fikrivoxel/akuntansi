/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const passport = require('passport')

const _onPassportAuth = (req, res, error, user, info) => {
    if(error) return res.serverError({
        status: 'failed',
        message: error.message
    })

    if(!user) return res.unAuthorizedResponse({
        status: 'failed',
        message: info.message
    })

    const data = {
        token: createToken.createToken(user),
        user: user
    }

    return res.ok({
        status: 'success',
        result: data
    })
}
module.exports = {
    signup: async function(req, res){
        const exist = await User.findOrCreate({
            email: req.body.email
        }, {
            email: req.body.email,
            password: req.body.password
        })
        .intercept('E_UNIQUE', () => {
            return res.existResponse({
                status: 'failed',
                message: `user with ${req.body.email} already exist`
            })
        })
        .intercept((err) => {
            return res.serverError({
                status: 'failed',
                message: err.message
            })
        })
        .exec(async(err, data, wasCreated) => {
            if(err){
                return res.serverError({
                status: 'failed',
                message: err.message
                })
            }
        
            if(wasCreated){
                delete data.password
                const datas = {
                token: createToken.createToken(data),
                user: data
                }
                return res.ok({
                status: 'success',
                message: `user ${req.body.email} successfully created`,
                result: datas
                }) 
            }
            else{
                return res.existResponse({
                status: 'failed',
                message: `user with ${req.body.email} already exist`
                })
            }
        })
    },

    signin: function(req, res){
        passport.authenticate('local', _onPassportAuth.bind(this, req, res))(req, res)
    }

};

