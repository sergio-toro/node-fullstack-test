const ConversionWorker = require('./lib/ConversionWorker')
let worker

function start (config) {
  const { url, queueName, options } = config.rabbit
  worker = new ConversionWorker(url, queueName, options)
  worker.listen()
  console.log('Conversion worker started')
}

function clear () {
  if (worker) {
    return worker.clear()
  } else {
    console.log('worker must be started before being used')
  }
}

exports.start = start
exports.clear = clear
