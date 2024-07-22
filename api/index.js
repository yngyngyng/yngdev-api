const express = require('express')
const app = express()

const dataRoute = require('./internal/data')
const newsletterRoute = require('./external/newsletter')
const gumroadRoute = require('./external/gumroad')
const mediumRoute = require('./external/medium')
const { checkToken } = require('../middlewares/token')

app.use(checkToken)
app.use('/internal/', pingRoute)
app.use('/internal/data/', dataRoute)
app.use('/external/newsletter/', newsletterRoute)
app.use('/external/gumroad/', gumroadRoute)
app.use('/external/medium/', mediumRoute)

module.exports = app
