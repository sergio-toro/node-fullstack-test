import flashMessage from './flashMessage'
import flashContainer from './flashContainer'

export { default as FLASH_EVENTS } from './events'
export const MODULE_NAME = 'component.flashContainer'

export default angular
  .module(MODULE_NAME, [])
  .component('flashMessage', flashMessage)
  .component('flashContainer', flashContainer)
