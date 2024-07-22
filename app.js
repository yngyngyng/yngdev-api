const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const events = require('events')
const whitelist = require('whitelist')
const rateLimit = require('express-rate-limit')

const PORT = 4000
const dev = process.env.NODE_ENV !== 'production'
const app = express()

if (dev) {
  require('dotenv').config({
    path: path.resolve(process.cwd(), '.env.development.local')
  })

  app.use(cors())
  app.options('*', cors())

  app.use(morgan('dev'))
} else {
  require('dotenv').config()

  console.log = function () {}

  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  app.use(cors())
  app.options(corsOptions, cors())
}

const errorMiddlewares = require('./middlewares/error')
const apiResponseMiddleware = require('./middlewares/response')

const dbConfig = require('./config/db')

;(async () => {
  try {
    await mongoose.connect(dbConfig.url)
    console.log('Database connected.')
  } catch (err) {
    console.log(`error: ${err}`)
  }
})()

process.on('SIGINT', () => {
  mongoose.disconnect().then(() => {
    console.log('exit')
    process.exit()
  })
})

app.set('trust proxy', 1)

const limiter = rateLimit({
  windowMs: 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false
})

app.use(limiter)

app.use(helmet())

app.use(express.json())


app.use(apiResponseMiddleware())

const v1 = require('./api')
app.use('/api/v1/', v1)

app.use(errorMiddlewares.notFound)
app.use(errorMiddlewares.errorHandler)

const eventEmitter = new events.EventEmitter()
app.set('eventEmitter', eventEmitter)

app.listen(PORT, () => {
  console.log(`Running on: ${PORT}`)
})

module.exports = app
