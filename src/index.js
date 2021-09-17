require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
})
const app = require('./web/config');
const log = require('./logger/logger.connect');
const mongo = require('./database/database.connection');

app.listen(process.env.PORT || 5000, () => log.info(`Server started on port: ${process.env.PORT || 5000}`))

