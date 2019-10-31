'use strict'

const { Device, validateDevice, validateDeviceId } = require('./device.model')


// 获取一个用户的所有设备
async function index(req, res, next) {
    // 查询
    const filter = req.body.filters || ''
    const reg = new RegExp(filter, 'i')

    // 排序
    const sortBy = req.body.sorts || 'byCreated'

    let sortDevices
    if (sortBy === 'byEdited') {
        sortDevices = { updatedAt: -1 }
    } else if (sortBy === 'byCreated') {
        sortDevices = { createdAt: -1 }
    } else if (sortBy === 'alphabetical') {
        sortDevices = { name: -1 }
    }

    // 分页
    const page = req.body.page || 1
    const items_per_page = 6
    const totalDevices = await Device.find({
        $or: [
            { name: { $regex: reg } },
            { macAddress: { $regex: reg } }
        ]
    }).countDocuments()

    // 获取设备
    const result = await Device
        .find({
            $or: [
                { name: { $regex: reg } },
                { macAddress: { $regex: reg } }
            ]
        })
        .populate('createdBy', 'name')
        .skip((page - 1) * items_per_page)
        .limit(items_per_page)
        .sort(sortDevices)

    // 返回
    res.json({
        status: '000000',
        data: {
            devices: result,
            pagination: {
                currentPage: page,
                hasNextPage: items_per_page * page < totalDevices,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalDevices / items_per_page)
            }
        }
    })
}


// 添加设备
async function create(req, res, next) {
    // 验证设备信息
    const { error } = validateDevice(req.body);
    if (error) { return next(error) }

    // 查询数据库中是否已存在设备
    const oldDevcie = await Device.findOne({ macAddress: req.body.macAddress })
    if (oldDevcie) { return next(new Error('设备已存在')) }

    // 添加设备
    const device = new Device({
        ...req.body,
        createdBy: req.user._id
    })

    device.save() //很关键

    // 返回
    res.json({
        status: '000000',
        data: device,
    })
}


// 查询设备 id
async function retrieve(req, res, next) {
    const deviceId = req.body.id

    // 验证设备ID
    const { error } = validateDeviceId(deviceId);
    if (error) { return next(error) }


    // 通过ID查询
    const device = await Device.findById(deviceId)

    // 无设备
    if (!device) { return next(new Error('设备不存在')) }

    // 返回
    res.json({
        status: '000000',
        data: device,
    })
}


// 更新设备 id
async function update(req, res, next) {
    const updates = req.body
    const userId = req.user._id

    // 验证设备信息
    const { error } = validateDevice({ name: updates.name, macAddress: updates.macAddress });
    if (error) { return next(error) }

    // 验证设备ID
    const { IDerror } = validateDeviceId(updates.id);
    if (IDerror) { return next(IDerror) }

    // 查找并更新设备
    const device = await Device.findOneAndUpdate({ _id: updates.id, createdBy: userId }, updates, { new: true })

    // 无设备
    if (!device) { return next(new Error('未查询到设备')) }

    // 返回
    res.json({
        status: '000000',
        data: device,
    })
}


// 删除设备 id
async function del(req, res, next) {
    const deviceId = req.body.id

    // 验证设备ID
    const { error } = validateDeviceId(deviceId);
    if (error) { return next(error) }

    // 通过ID删除设备
    const device = await Device.findOneAndDelete({ _id: deviceId })

    // 无设备
    if (!device) { return next(new Error('未查询到设备')) }

    // 返回
    res.json({
        status: '000000',
        data: device,
    })
}


module.exports = {
    index,
    create,
    retrieve,
    update,
    del
}