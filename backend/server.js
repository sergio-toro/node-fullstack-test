'use strict';

const express = require('express');
const mongoose = require('mongoose');
const amqp = require('amqplib/callback_api');

// Constants
const APP_PORT = process.env.APP_PORT || 8020;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/test_db'
const RABBIT_URL = process.env.RABBIT_URL || 'amqp://localhost'

// DB connect
mongoose.connect(MONGO_URL);

//
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



// App
const app = express();

app.get('/', function (req, res) {
  res.send('Hello world 2!!\n');
});

app.listen(APP_PORT);
console.log('Running on http://localhost:' + APP_PORT);
