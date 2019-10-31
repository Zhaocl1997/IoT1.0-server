'use strict'

const loggor = require('../config/logger')

exports.get404 = (req, res, next) => {
    res.json({
        status: false,
        data: 'Not Found'
    })
}

exports.get500 = (error, req, res, next) => {
    // loggor
    res.json({
        status: '999999',
        data: error.message
    })
}