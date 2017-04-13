'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const amqp = require('amqplib/callback_api');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Constants
const APP_PORT = process.env.APP_PORT || 8020;
const SOCKET_PORT = process.env.SOCKET_PORT || 3500;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/test_db'
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://localhost'

// DB connect
mongoose.connect(MONGO_URL);

// amqp connect
amqp.connect(RABBIT_URL, function(err, conn) {
  console.log('CONNECTION', err)

  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });
});

// Socket.io
io.on('connection', function(client) {
  console.log('Hello new client', client.id)

  client.on('disconnect', function(params) {
    console.log('Socket.io disconnect', params)
  })

  // Way to
  const data = {
    foo: 'bar',
    list: [ 1, 2, 3, 4, 5 ],
  }
  client.emit('list-state', data)
  console.log('emit!', data)
})
server.listen(SOCKET_PORT)


// App
app.get('/', function (req, res) {
  res.send('Hello world 2!!\n');
})

app.listen(APP_PORT);
console.log('Running on http://localhost:' + APP_PORT);
