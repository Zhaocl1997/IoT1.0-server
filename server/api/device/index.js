'use strict'

const express = require('express')
const controller = require('./device.controller')
const auth = require('../../auth/auth.service')

const router = new express.Router()

router.post('/index', auth.isAuthenticated(), controller.index)   //  获取单一用户所有设备
router.post('/create', auth.isAuthenticated(), controller.create)  //  添加设备
router.post('/retrieve', auth.isAuthenticated(), controller.retrieve)  //  查询设备 id
router.post('/update', auth.isAuthenticated(), controller.update)  //  更新设备 id
router.post('/del', auth.isAuthenticated(), controller.del)  //  删除设备 id

module.exports = router