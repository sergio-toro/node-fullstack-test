const app = require('express')()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')


app
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())
  .use(methodOverride())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin,Accept, X-Requested-With,Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
  })

function start(config) {
  routes.setup(app)

  const port = config.express.port
  app.listen(port)
  console.log('Express server running on http://localhost:' + port)
}
// *******************************************************
exports.start = start
exports.app = app

