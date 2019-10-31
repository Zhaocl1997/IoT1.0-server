'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Joi = require('@hapi/joi')

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    role: { type: String, default: 'user' },
    provider: { type: String, default: 'local' },
    salt: String,
    hashedPassword: String,
}, {
    timestamps: true
})

/**
 * 虚拟属性
 */

// 保存前加密
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = bcrypt.genSaltSync(10)
        this.hashedPassword = bcrypt.hashSync(this._password, this.salt)
    })
    .get(function () {
        return this._password
    })

// 用户文档
UserSchema
    .virtual('profile')
    .get(function () {
        return {
            'name': this.name,
            'role': this.role
        }
    })

// 令牌中放置非敏感信息
UserSchema
    .virtual('token')
    .get(function () {
        return {
            '_id': this._id,
            'role': this.role
        }
    })


/**
* 验证
*/
function validateUser(req) {
    const schema = Joi.object({
        name: Joi.string().trim().lowercase().min(6).max(15).error(new Error('用户名长度应在6-15字符!')),
        email: Joi.string().required().trim().lowercase().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).error(new Error('邮箱不合法!')),
        password: Joi.string().required().trim().pattern(/^[a-zA-Z0-9]{8,13}$/).error(new Error('密码输入错误!'))
    });
    return schema.validate(req);
}

function validateUserId(userID) {
    const schema = Joi.string().required().length(24)
    return schema.validate(userID);
}

const User = mongoose.model('User', UserSchema)

module.exports = { User, validateUser, validateUserId }