'use strict'

const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const DeviceSchema = new mongoose.Schema({
    name: String,
    macAddress: { type: String, unique: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


/**
* 验证
*/
function validateDevice(device) {
    const schema = Joi.object({
        name: Joi.string().required().trim().alphanum().min(6).max(15).error(new Error('设备名输入错误!')),
        macAddress: Joi.string().required().trim() //.pattern(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/).error(new Error('mac地址输入错误!'))
    });
    return schema.validate(device);
}

function validateDeviceId(devID) {
    const schema = Joi.string().required().length(24)
    return schema.validate(devID);
}

const Device = mongoose.model('Device', DeviceSchema)

module.exports = { Device, validateDevice, validateDeviceId }