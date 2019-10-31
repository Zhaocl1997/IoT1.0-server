'use strict'

const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    macAddress: {
        type: String
    },
    data: {
        type: mongoose.Mixed
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }
}, {
    timestamps: true
})

/**
* Pre-save hook
*/
DataSchema
    .pre('save', function (next) {
        const data = this
        const now = new Date()
        data.updatedAt = now
        if (!data.createdAt) {
            data.createdAt = now
        }
        next()
    })
    .post('save', function (doc) {
        //console.log('Post Save Called', doc)
        require('./data.socket.js').onSave(doc)
    })

const Data = mongoose.model('Data', DataSchema)

module.exports = Data