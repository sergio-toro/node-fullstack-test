const http = require('http')
const socketIo = require('socket.io')

let io

function start (config, app) {
  const server = http.createServer(app)
  io = socketIo(server)

  io.on('connection', (socket) => {
    console.log('==> Socket.io client connected', socket.id)
  })

  server.listen(config.io.port)
  console.log('Socket.io started on port', config.io.port)
}

function emit (channel, data) {
  if (io) {
    io.emit(channel, data)
    console.log('==> Socket.io emit', data.name, data.status)
  }
}

exports.start = start
exports.emit = emit
