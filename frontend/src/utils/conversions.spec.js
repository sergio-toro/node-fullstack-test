import { getIcon, getDescription } from './conversions'

describe('utils: conversions', () => {
  describe('function getIcon()', () => {
    it('should get the correct icon from the status', () => {
      const item = { status: 'processed' }
      expect(getIcon(item)).toEqual('check')
    })
    it('should get the correct icon from the status', () => {
      const item = { status: 'processing' }
      expect(getIcon(item)).toEqual('info')
    })
  })

  describe('function getDescription()', () => {
    it('should get the correct icon from the status', () => {
      const item = { name: 'Hello World!', status: 'processed' }
      expect(getDescription(item)).toEqual(`Request 'Hello World!' processed`)
    })
    it('should get the correct icon from the status', () => {
      const item = { name: 'PDF #2', status: 'processing' }
      expect(getDescription(item)).toEqual(`Request 'PDF #2' started processing`)
    })
  })
})
