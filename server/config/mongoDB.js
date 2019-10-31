/**
 * mongo 配置
 */

'use strict'

const mongoose = require('mongoose');
const config = require('../config/environment/development');
mongoose.Promise = global.Promise;

function openConnect() {
    mongoose.connect(config.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => console.log('Mongodb connected '))
        .catch(err => console.log('Mongodb connect error', err))

}

async function closeConnect() {
    //await oracledb.getPool().close();  
}

async function startupDB() {
    try {
        openConnect();
    } catch (err) {
        console.error(err);
        process.exit(1); // Non-zero failure code
    }
}

module.exports = {
    closeConnect,
    startupDB
}