const request = require('supertest')
const io = require('socket.io-client')
const config = require('../config')

const API_URL = 'http://localhost:' + config.express.port
const SOCKET_URL = 'ws://localhost:' + config.io.port

exports.createConversion = (type) => request(API_URL)
  .post('/conversion')
  .set('Accept', 'application/json')
  .send({ type })
  .expect('Content-Type', /json/)
  .expect(200)
  .then(({body}) => body)

exports.listConversions = () => request(API_URL)
  .get('/conversion-list')
  .set('Accept', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(({body}) => body)

exports.clearConversions = () => request(API_URL)
  .get('/conversion-clear')
  .set('Accept', 'text/html')
  .expect('Content-Type', /html/)
  .expect(200)
  .then(({text}) => text)

exports.getSocketClient = () => io(SOCKET_URL)

