const mongoose = require('mongoose');
const log = require('../logger/logger.connect');
const options = require('./database.options');

const mongo = mongoose.connect(process.env.MONGODB_URL, options).then(() => log.info('MongoDB connected!')).catch(err => log.fatal("MongoDB error: ", err))

module.exports = mongo;