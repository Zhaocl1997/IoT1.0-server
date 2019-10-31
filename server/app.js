'use strict'

// 设置默认环境为开发
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// 引入环境变量
const config = require('./config/environment')

// 启动数据库
const mongoDB = require('./config/mongoDB')
mongoDB.startupDB()

// 设置服务
const errorHandler = require('./middleware/error')
const logconsole = require('./utils/logconsole')

const express = require('express')
require('express-async-errors') //全局的express异步错误处理

// 服务
const app = express()

// 打印屏幕信息
app.use(logconsole.logrequest)

const server = require('http').createServer(app)
const socketio = require('socket.io')(server, {
    serveClient: config.env !== 'production'
});

// socket配置
require('./config/socketio')(socketio)

// webAPI配置
require('./config/express')(app)

// 路由
require('./routes')(app)

// MQTT
require('./mqtt')


// 错误处理中间件
app.use(errorHandler.get404)
app.use(errorHandler.get500)

// 启动服务
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
})

// 暴露程序
module.exports = app