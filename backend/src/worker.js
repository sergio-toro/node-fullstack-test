const ConversionWorker = require('./lib/ConversionWorker')
let worker

function start (config) {
  const { url, queueName, options } = config.rabbit
  worker = new ConversionWorker(url, queueName, options)
  worker.listen()
  console.log('Conversion worker started')
}

exports.start = start
