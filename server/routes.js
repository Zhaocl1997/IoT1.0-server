/**
 * 主要路由
 */

'use strict'

const path = require('path')

module.exports = function (app) {
    // 在下面加入新路由
    app.use('/api/v1/users', require('./api/user'))
    app.use('/api/v1/devices', require('./api/device'))
    app.use('/api/v1/data', require('./api/data'))

    app.use('/auth', require('./auth'))
}