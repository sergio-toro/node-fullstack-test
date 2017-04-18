const socket = require('../socket')
const Conversion = require('../models/Conversion')
const RabbitConnect = require('./RabbitConnect')

module.exports = class ConversionWorker extends RabbitConnect {
  constructor (rabbitUrl, queue, options) {
    super(rabbitUrl, queue, options)

    this.logName = 'ConversionWorker'
  }

  async listen () {
    try {
      const ch = await this.getChannel()

      // ensure rabbit is prioritising messages
      await ch.prefetch(1)

      const self = this
      ch.consume(this.queue, async function (message) {
        if (message === null) { return }

        try {
          const data = JSON.parse(message.content)
          await self.doWork(data)
          ch.ack(message)
        } catch (error) {
          ch.nack(message, false, false)
          self.warn(`consume error, work discarded`, error)
        }
      })
    } catch (error) {
      this.warn('Error listening', error)
    }
  }

  async doWork (data) {
    const { _id } = data
    const item = await Conversion.findOne({ _id })

    item.status = 'processing'
    await item.save()

    this.log('Processing item', item.name)
    socket.emit('conversion-updated', item)

    const timeout = item.type === 'html' ? 5 : 15
    // const timeout = item.type === 'html' ? 10 : 100

    // simulates heavy duty work
    return new Promise((resolve, reject) => {
      const self = this
      setTimeout(async function () {
        try {
          self.log('Processed item', item.name)
          item.status = 'processed'
          await item.save()
          socket.emit('conversion-updated', item)

          resolve()
        } catch (error) {
          reject(error)
        }
      }, timeout * 1000)
    })
  }
}
