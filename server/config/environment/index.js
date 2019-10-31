'use strict'

const path = require('path')
const _ = require('lodash')

var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'test-scaffold-secret',
        expTime: '1h'
    },

    // List of user roles
    userRoles: ['user', 'admin'],

    // // MongoDB connection options
    // mongo: 
}

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {})
