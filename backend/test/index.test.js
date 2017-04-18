const { expect } = require('chai')
const request = require('supertest')
const config = require('../config')

const API_URL = 'http://localhost:' + config.express.port

describe('Conversions API', () => {
  it('should return a list of items', function() {
    return request(API_URL)
      .get('/conversion-list')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({body}) => {
        expect(body).to.be.array
      })
  })
})
