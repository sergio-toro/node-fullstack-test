// Socket.io
module.exports = class RealTimeServer {
  constructor(io) {
    this.io = io
    this.io.on('connection', (socket) => {
      console.log('==> Socket.io client connected', socket.id)
    })
  }

  emit(channel, data) {
    console.log('==> Socket.io emit', data.name, data.status)
    this.io.emit(channel, data)
  }

  conversionUpdated(data) {
    this.emit('conversion-updated', data)
  }
}
