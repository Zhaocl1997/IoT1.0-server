'use strict'

const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../../config/environment')

const router = new express.Router()

router.post('/', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err) }
        if (!user) { return next(new Error('账号或密码错误!')) }

        req.logIn(user, function (err) {

            const token = jwt.sign({ _id: user.id }, config.secrets.session, { expiresIn: config.secrets.expTime })

            if (err) { return next(err) }

            res.json({
                status: "000000",
                data: {
                    userID: user.id,
                    token
                }
            })
        });
    })(req, res, next)
})

module.exports = router