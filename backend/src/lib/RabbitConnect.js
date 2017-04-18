const amqp = require('amqplib')

module.exports = class RabbitConnect {
  constructor (rabbitUrl, queue, options) {
    this.logName = 'RabbitConnect'
    this.rabbitUrl = rabbitUrl
    this.queue = queue
    this.options = options
  }

  async getConnection () {
    const conn = await amqp.connect(this.rabbitUrl)

    process.once('SIGINT', conn.close.bind(conn))

    return conn
  }

  async getChannel () {
    const conn = await this.getConnection()
    const ch = await conn.createChannel()
    await ch.assertQueue(this.queue, this.options)

    process.once('SIGINT', ch.close.bind(ch))

    return ch
  }

  log (message, data) {
    console.warn(`== ${this.logName} ==> ${message}`, data)
  }

  warn (message, data) {
    console.warn(`== ${this.logName} ==> ${message}`, data)
  }
}
