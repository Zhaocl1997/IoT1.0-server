/**
 * console 配置
 */

'use strict'

const { createLogger, format, transports } = require("winston")

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'ATP service' },
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});

module.exports = logger