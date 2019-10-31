'use strict'

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        url: 'mongodb://localhost:27017/iot-api-1'
    },

    mqtt: {
        host: process.env.EMQTT_HOST || '127.0.0.1',
        clientId: 'API_Server_Dev',
        port: 8883
    }
}