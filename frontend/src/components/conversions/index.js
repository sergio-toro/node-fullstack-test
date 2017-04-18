import conversions from './conversions'

export { default as CONVERSION_EVENTS } from './events'
export const MODULE_NAME = 'component.conversions'

export default angular
  .module(MODULE_NAME, [])
  .component('conversions', conversions)
