import flashMessage from './flashMessage'
import flashContainer from './flashContainer'

const MODULE_NAME = 'component.flashContainer'

export default angular
  .module(MODULE_NAME, [])
  .component('flashMessage', flashMessage)
  .component('flashContainer', flashContainer)
