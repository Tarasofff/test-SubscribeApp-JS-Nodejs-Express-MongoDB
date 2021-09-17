const express = require('express');
const app = express();
const controllers = require('./controllers');

app.use(express.json())
app.use('/api', controllers)

module.exports = app;