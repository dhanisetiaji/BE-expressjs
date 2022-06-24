const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json } = format;

function buildProdLogger() {
    return createLogger({
        format: combine(timestamp(), errors({ stack: true }), json()),
        defaultMeta: { service: 'api-service' },
        transports: [new transports.Console(),
        new transports.File({ filename: 'logs/prod.log' })
        ],
    });
}

module.exports = buildProdLogger;