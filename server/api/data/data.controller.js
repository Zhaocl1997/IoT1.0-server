'use strict'

const Data = require('./data.model')

/**
 * 查询一个设备的数据
 */

exports.index = async (req, res, next) => {
    const macAddress = req.params.deviceId
    const limit = parseInt(req.params.limit) || 30

    try {
        const data = await Data.find({ macAddress: macAddress }).limit(limit)

        if (data) return res.status(200).send(data)
        return res.status(404).send('Not found')
    } catch (e) {
        next(e)
    }
}

/**
 * 添加数据记录
 */

exports.create = async (req, res, next) => {
    const data = req.body
    const userId = req.user._id
    data.createdBy = userId

    try {
        const newData = await Data.create(data)

        if (newData) {
            if (data.topic === 'led') {
                require('../../mqtt/index.js').sendLEDData(data.data.l)
                // sendled value
            }
            res.status(200).send(newData)
        }
    } catch (e) {
        next(e)
    }
}