const config = require('./config')
const mongoose = require('mongoose')
const server = require('./src/server')
const worker = require('./src/worker')
const queue = require('./src/queue')
const socket = require('./src/socket')

console.log('Connecting to MongoDB...')
mongoose.Promise = global.Promise
mongoose.connect(config.db.mongodb)

console.log('Successfully connected to MongoDB. Starting socket...')
socket.start(config, server.app)

console.log('Successfully started socket. Starting worker...')
worker.start(config)

console.log('Successfully started worker. Starting queue...')
queue.start(config)

console.log('Successfully started queue. Starting web server...')
server.start(config)

console.log('Successfully started web server. Waiting for incoming connections...')
