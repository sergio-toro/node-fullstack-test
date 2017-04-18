const app = require('express')()

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// Set up mongo connection
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URL)
const Conversion = require('./src/models/Conversion')

// Set up realTime communication
const RealTimeServer = require('./src/services/RealTimeServer')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const realTime = new RealTimeServer(io)
server.listen(process.env.SOCKET_PORT)

// Constants
const APP_PORT = process.env.APP_PORT
const RABBIT_URL = process.env.RABBIT_URL

const amqp = require('amqplib')
const CONVERSIONS_QUEUE = 'conv-4'
const QUEUE_OPTIONS = {
  durable: true,
  maxPriority: 2,
}

const ConversionWorker = require('./src/services/ConversionWorker')
const worker = new ConversionWorker(
  RABBIT_URL,
  CONVERSIONS_QUEUE,
  QUEUE_OPTIONS,
  Conversion,
  realTime
)
worker.listen()

const ConversionQueue = require('./src/services/ConversionQueue')
const queue = new ConversionQueue(RABBIT_URL, CONVERSIONS_QUEUE, QUEUE_OPTIONS)

// App
app
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())
  .use(methodOverride())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin,Accept, X-Requested-With,Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
  })
  .get('/', (req, res) => {
    res.send(
      `Available methods:<br />` +
      `-GET /conversion-list: list all conversions<br />` +
      `-GET /clear: deletes all conversions stored<br />` +
      `-POST /conversion: creates a new convertion. Params: { type: oneOf(['html', 'pdf']) }<br />`
    )
  })
  .get('/conversion-list', async function(req, res) {
    try {
      const list = await Conversion.find().exec()
      res.send(list)
    } catch (error) {
      console.error('ERROR', error)
      res.status(500).send('Failed to list conversions')
    }
  })
  .get('/clear', function(req, res) {
    Conversion.remove({}, function (error) {
      if (error) {
        console.error('ERROR', error)
        res.status(500).send('Failed to clear conversions')
      } else {
        res.send('Conversions cleared')
      }

    })
  })
  .post('/conversion', async function(req, res) {
    try {
      const { type } = req.body
      const count = await Conversion.count({ type })

      const item = new Conversion({
        name: `${type.toUpperCase()} #${count + 1}`,
        type: type,
        status: 'queued',
      })
      await item.save()
      queue.send(item)
      res.send(item)
    } catch (error) {
      console.error('ERROR', error)
      res.status(500).send('Failed to schedule conversion')
    }
  })

app.listen(APP_PORT)
console.log('Running on http://localhost:' + APP_PORT)
