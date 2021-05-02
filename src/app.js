import express from 'express'
import config from './config.js'
import logger, { morganLogger } from './libs/logger.js'
import db from './db_init.js'

const app = express()
const port = config['APP_PORT']

app.use(morganLogger)
app.get('/', (req, res) => {
  res.send("Hello world")
})

const server = app.listen(port, () => {
  logger.info(`BezKoder Ecommerce server listening on port ${server.address().port}`)
})



