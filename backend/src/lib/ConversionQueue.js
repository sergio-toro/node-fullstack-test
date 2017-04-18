const RabbitConnect = require('./RabbitConnect')

module.exports = class ConversionQueue extends RabbitConnect {

  constructor(rabbitUrl, queue, options, Conversion, realTime) {
    super(rabbitUrl, queue, options)

    this.logName = 'ConversionQueue'
  }

  async send(item) {
    try {
      const ch = await this.getChannel()

      const buffer = new Buffer.from(JSON.stringify({ _id: item._id }))
      const priority = item.type === 'html' ? 2 : 0
      await ch.sendToQueue(this.queue, buffer, { priority })

      this.log('queue send', item.name)
      return ch.close()
    } catch (error) {
      this.warn('queue error', error)
    }
  }
}
