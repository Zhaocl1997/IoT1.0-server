'use strict'

const express = require('express')
const controller = require('./data.controller')
const config = require('../../config/environment')
const auth = require('../../auth/auth.service')

const router = new express.Router()

router.get('/:deviceId/:limit', auth.isAuthenticated(), controller.index)  //  查询数据
router.post('/', auth.isAuthenticated(), controller.create)  //  添加数据记录

module.exports = router