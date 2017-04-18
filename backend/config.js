module.exports = {
  db: {
    mongodb: process.env.MONGO_URL,
  },
  io: {
    port: process.env.SOCKET_PORT,
  },
  rabbit: {
    url: process.env.RABBIT_URL,
    queueName: 'conversions-queue',
    options: {
      durable: true,
      maxPriority: 2,
    },
  },
  express: {
    port: process.env.APP_PORT,
  }
}
