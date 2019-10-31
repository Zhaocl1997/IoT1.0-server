'use strict'

const express = require('express')
const { User } = require('../api/user/user.model')

// Passport Configuration
require('./local/passport').setup(User)

const router = new express.Router()

router.use('/local', require('./local'))

module.exports = router