'use strict';

const app = require('express')()
const mongoose = require('mongoose')
const amqp = require('amqplib')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const server = require('http').createServer(app)
const io = require('socket.io')(server)

// Constants
const APP_PORT = process.env.APP_PORT
const SOCKET_PORT = process.env.SOCKET_PORT
const MONGO_URL = process.env.MONGO_URL
const RABBIT_URL = process.env.RABBIT_URL

const CONVERSIONS_QUEUE = 'conv-4'

// Socket.io
class RealTimeServer {
  constructor() {
    this.socket = null

    this.connect()
  }

  connect() {
    return new Promise((resolve) => {
      io.on('connection', (socket) => {
        resolve(socket)
      })
      server.listen(SOCKET_PORT)
    })

  }

  async emit(channel, data) {
    if (this.socket === null) {
      this.socket = await this.connect()
    }

    this.socket.emit(channel, data)
  }
}

const realTime = new RealTimeServer()


// amqp
const getChannel = async function(queue) {
  try {
    const conn = await amqp.connect(RABBIT_URL)

    process.once('SIGINT', conn.close.bind(conn))

    const ch = await conn.createChannel()
    await ch.assertQueue(queue, {
      durable: true,
      maxPriority: 2,
    })
    return ch
  } catch(error) {
    console.warn('getChannel', error)
  }
}

const sendToQueue = async function(queue, data, priority = 0) {
  try {
    const ch = await getChannel(queue)
    const buffer = new Buffer.from(JSON.stringify(data))
    await ch.sendToQueue(queue, buffer, { priority })

    console.log('==> Sent to queue', data, {priority})
    // return ch.close()
  } catch(error) {
    console.warn('sendToQueue', error)
  }
}

const consumeQueue = async function(queue, callback) {
  try {
    const ch = await getChannel(queue)
    await ch.prefetch(1)
    // await ch.basicQos(1)
    ch.consume(queue, (message) => {
      callback(ch, message)
    })
    console.log('[*] Waiting for messages. To exit press CTRL+C')
  } catch(error) {
    console.warn('consumeQueue', error)
  }
}

consumeQueue(CONVERSIONS_QUEUE, async function(ch, message) {
  if (message === null) {
    return
  }
  try {
    const data = JSON.parse(message.content)
    const { _id } = data

    if (!_id) {
      console.warn('===> Message discarded', data)
      return ch.nack(message, false, false)
    }
    const item = await Conversion.findOne({ _id })

    item.status = 'processing'
    await item.save()
    await realTime.emit('conversion-updated', item)

    const timeout = item.type === 'html' ? 10 : 100
    console.log('===> Received message', item.name, timeout)

    setTimeout(async function() {
      console.log('===> Message ACK', item.name)
      item.status = 'processed'
      await item.save()
      await realTime.emit('conversion-updated', item)

      ch.ack(message)
    }, timeout * 1000)
  } catch (error) {
    console.warn('--> Conversion worker error', error)
    ch.nack(message)
  }

})


// DB connect
mongoose.Promise = global.Promise
mongoose.connect(MONGO_URL)
const Conversion = mongoose.model('Conversion', {
  name: String,
  type: { type: String, enum: ['pdf', 'html',] },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['processed', 'processing', 'queued',]
  }
})

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
    res.send('Hello world 2!!\n')
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
      await sendToQueue(
        CONVERSIONS_QUEUE,
        { _id: item._id },
        type === 'html' ? 2 : 0
      )

      res.send(item)
    } catch (error) {
      console.error('ERROR', error)
      res.status(500).send('Failed to schedule conversion')
    }
  })

app.listen(APP_PORT)
console.log('Running on http://localhost:' + APP_PORT)
