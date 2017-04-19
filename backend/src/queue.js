const ConversionQueue = require('./lib/ConversionQueue')
let queue

function start (config) {
  const { url, queueName, options } = config.rabbit
  queue = new ConversionQueue(url, queueName, options)
  console.log('Conversion queue started')
}

function send (item) {
  if (queue) {
    queue.send(item)
  } else {
    console.log('queue must be started before being used')
  }
}

function purge (item) {
  if (queue) {
    return queue.purge()
  } else {
    console.log('queue must be started before being used')
  }
}

exports.start = start
exports.send = send
exports.purge = purge
