'use strict'

const config = require('../config/environment')
const expressJwt = require('express-jwt')       // 验证token中间件
const compose = require('composable-middleware')        // 将一系列中间件视为一个中间件
const { User } = require('../api/user/user.model')
const validateJwt = expressJwt({ secret: config.secrets.session })

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
const isAuthenticated = () => {
    return compose()
        // Validate jwt
        .use((req, res, next) => {            
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token
            }
            validateJwt(req, res, next)
            console.log(validateJwt(req, res, next));
            
        })
        // Attach user to request
        .use((req, res, next) => {
            User.findById(req.user._id, (err, user) => {
                if (err) return next(err)
                if (!user) return next(new Error('未认证!'))

                req.user = user
                next()
            })
        })
}


/**
 * Checks if the user role meets the minimum requirements of the route
 */
const hasRole = (roleRequired) => {
    if (!roleRequired) throw new Error('Required role needs to be set')

    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                next()
            } else {
                next(new Error('未授权!'))
            }
        })
}

/**
 * Set token cookie directly for oAuth strategies
 */
const setTokenCookie = (req, res) => {
    if (!req.user) return res.status(404).json({ message: 'Something went wrong, please try again.' })
    var token = signToken(req.user._id, req.user.role)
    res.cookie('token', JSON.stringify(token))
    res.redirect('/')
}

module.exports = {
    isAuthenticated,
    hasRole,
    setTokenCookie
}