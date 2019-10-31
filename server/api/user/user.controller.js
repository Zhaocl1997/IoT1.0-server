'use strict'

const { User, validateUser, validateUserId } = require('./user.model')
const bcrypt = require('bcryptjs')

/**
 * 获取所有用户
 * 限定: 'admin'
 */
async function index(req, res, next) {
    const user = await User.find({}, '-salt -hashedPassword')

    // 返回
    res.json({
        status: '000000',
        data: user,
    })
}

/**
 * 删除用户
 * 限定: 'admin'
 */
async function del(req, res, next) {
    const userID = req.body.id

    // 验证ID
    const { error } = validateUserId(user);
    if (error) { return next(error) }

    // 删除用户
    const user = await User.findByIdAndDelete(userID)

    // 返回
    res.json({
        status: '000000',
        data: user
    })
}


// 注册
async function register(req, res, next) {
    const user = req.body

    // 验证注册信息
    const { error } = validateUser(user);
    if (error) { return next(error) }

    // 添加用户
    const newUser = await User.create(user)

    // 返回
    res.json({
        status: '000000',
        data: newUser
    })
}


// 查询用户文件
async function profile(req, res, next) {
    const userID = req.user.id

    // 验证用户ID
    const { error } = validateUserId(userID);
    if (error) { return next(error) }

    // 查询用户文件
    const user = await User.findById(userID)

    // 返回
    res.json({
        status: '000000',
        data: user.profile,
    })
}


// 更改密码
async function pwd(req, res, next) {
    const userID = req.user.id
    const oldPass = req.body.oldPassword
    const newPass = req.body.newPassword

    // 验证用户ID
    const { error } = validateUserId(userID);
    if (error) { return next(error) }

    // // 查询用户
    const user = await User.findById({ _id: userID })

    // 验证输入密码与原密码是否相同
    if ((bcrypt.hashSync(oldPass, user.salt) === user.hashedPassword)) {
        user.password = newPass
        user.save() // 很关键
        return res.json({
            status: '000000',
            data: user,
        })
    } else { return next(new Error('旧密码错误!')) }
}


// 获取个人信息
async function info(req, res, next) {
    const userID = req.user.id

    // 验证用户ID
    const { error } = validateUserId(userID);
    if (error) { return next(error) }

    // 查询
    const user = await User.findOne({ _id: userID }, '-salt -hashedPassword')

    // 返回
    res.json({
        status: '000000',
        data: user
    })
}


module.exports = {
    index,
    del,
    register,
    profile,
    info,
    pwd,
}