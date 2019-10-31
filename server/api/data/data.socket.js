/**
 * Broadcast updates to client when the model changes
 */

'use strict'

const data = require('./data.model')
const socket = undefined

exports.register = function (_socket) {
    socket = _socket
}

function onSave(doc) {
    // send data to only the intended device
    socket.emit('data:save:' + doc.macAddress, doc)
}

module.exports.onSave = onSave