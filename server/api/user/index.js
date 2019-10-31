'use strict'

const express = require('express')
const controller = require('./user.controller')
const auth = require('../../auth/auth.service')

const router = new express.Router()

// admin
router.post('/index', auth.hasRole('admin'), controller.index)
router.post('/del', auth.hasRole('admin'), controller.del)

// user
router.post('/register', controller.register)  // 注册
router.post('/info', auth.isAuthenticated(), controller.info)  // 获取个人信息
router.post('/pwd', auth.isAuthenticated(), controller.pwd)  // 更改密码
router.post('/profile', auth.isAuthenticated(), controller.profile)  // 获取单一用户信息

module.exports = router