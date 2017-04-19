const { expect } = require('chai')
const { createConversion, listConversions, clearConversions } = require('./testUtils')

describe('Conversions API', () => {
  before(function () {
    return clearConversions()
  })
  after(function () {
    return clearConversions()
  })


  it('should create an "html" conversion', async function() {
    const result = await createConversion('html')
    expect(result.type).to.eq('html')
  })

  it('should create an "pdf" conversion', async function() {
    const result = await createConversion('pdf')
    expect(result.type).to.eq('pdf')
  })

  it('should return a list of conversions', async function() {
    const result = await listConversions()

    expect(result).to.be.array
    expect(result).to.not.be.empty
    result.forEach(item => {
      expect(item._id).to.be.string
      expect(item.name).to.be.string
      expect(item.type).to.be.oneOf([ 'html', 'pdf' ])
      expect(item.status).to.be.oneOf([ 'queued', 'processing', 'processed' ])
      expect(item.createdAt).to.be.string
    })
  })

  it('should clear conversions', async function() {
    const result = await clearConversions()

    expect(result).to.eq('Conversions cleared')
  })

  it('should return an empty list of conversions', async function() {
    const result = await listConversions()

    expect(result).to.be.array
    expect(result).to.be.empty
  })
})
