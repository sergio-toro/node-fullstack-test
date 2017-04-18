const mongoose = require('mongoose')

module.exports = mongoose.model('Conversion', {
  name: String,
  type: { type: String, enum: ['pdf', 'html',] },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['processed', 'processing', 'queued',]
  }
})
