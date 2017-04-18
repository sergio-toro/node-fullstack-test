const handlers = require('./handlers')

function setup(app) {
  app.get('/', handlers.default)
  app.get('/conversion-list', handlers.listConversions)
  app.get('/conversion-clear', handlers.clearConversions)
  app.post('/conversion', handlers.createConversion)
}

exports.setup = setup
