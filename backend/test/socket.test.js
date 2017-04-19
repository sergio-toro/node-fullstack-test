const { expect } = require('chai')
const { getSocketClient, createConversion, clearConversions } = require('./testUtils')



describe('Socket data transmission', () => {
  beforeEach(function () {
    return clearConversions()
  })
  afterEach(function () {
    return clearConversions()
  })

  it('should receive a "processing" event after creating a conversion', function(done) {
    this.timeout(11000)
    const socket = getSocketClient()

    createConversion('html')

    socket.on('conversion-updated', (data) => {
      expect(data).to.be.object
      expect(data.type).to.eq('html')
      expect(data.status).to.oneOf(['processing', 'processed'])

      if (data.status === 'processed') {
        socket.close()
        done()
      }
    })
  })

  it('should process html conversions first', function(done) {
    this.timeout(21000)
    const socket = getSocketClient()

    createConversion('html').then((firstHtml) => {
      createConversion('pdf')
      createConversion('html')

      socket.on('conversion-updated', (data) => {
        // ignore processing events and first element
        if (data.status === 'processed' || firstHtml._id === data._id) { return }

        expect(data).to.be.object
        expect(data.type).to.eq('html')
        expect(data.status).to.eq('processing')

        socket.close()
        done()
      })
    })
  })

})
