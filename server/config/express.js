/**
 * Express 配置
 */

'use strict'

const bodyParser = require('body-parser')     //  body 解析中间件
const passport = require('passport')      // 登录验证中间件
const cors = require('cors')      // 跨域

module.exports = function (app) {
    const env = app.get('env')

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(passport.initialize())


    // 跨域请求配置
    const whitelist = ['http://localhost:8080', 'http://localhost:3000', 'http://web.hdkyl.cn:8080', 'http://192.168.0.169']
    const corsOptions = {
        credentials: true,
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('不允许跨域请求'))
            }
        }

    }
    app.use(cors(corsOptions))

    // if ('production' === env) {
    //     app.use(morgan('dev'))
    // }

    // if ('development' === env || 'test' === env) {
    //     app.use(morgan('dev'))
    // }


    
}
