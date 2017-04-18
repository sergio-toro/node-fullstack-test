const Conversion = require('../models/Conversion')
const queue = require('../queue')

exports.default = (req, res) => {
  res.send(
    `Available methods:<br />` +
    `-GET /conversion-list: list all conversions<br />` +
    `-GET /clear: deletes all conversions stored<br />` +
    `-POST /conversion: creates a new convertion. Params: { type: oneOf(['html', 'pdf']) }<br />`
  )
}

exports.listConversions = async function (req, res) {
  try {
    const list = await Conversion.find().exec()
    res.send(list)
  } catch (error) {
    console.error('ERROR', error)
    res.status(500).send('Failed to list conversions')
  }
}

exports.clearConversions = async function (req, res) {
  try {
    await Conversion.remove({})
    res.send('Conversions cleared')
  } catch (error) {
    res.status(500).send('Failed to clear conversions')
  }
}

exports.createConversion = async function (req, res) {
  try {
    const { type } = req.body
    const count = await Conversion.count({ type })

    const item = new Conversion({
      name: `${type.toUpperCase()} #${count + 1}`,
      type: type,
      status: 'queued'
    })
    await item.save()
    queue.send(item)
    res.send(item)
  } catch (error) {
    res.status(500).send('Failed to schedule conversion')
  }
}
