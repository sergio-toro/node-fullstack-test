const MODULE_NAME = 'app.components'

import app from './app/app'
import statusTag from './statusTag/statusTag'
import tag from './tag/tag'
import flashMessage from './flash/flashMessage'
import flashContainer from './flash/flashContainer'
import conversions from './conversions/conversions'

export default angular
  .module(MODULE_NAME, [])
  .component('app', app)
  .component('statusTag', statusTag)
  .component('tag', tag)
  .component('flashMessage', flashMessage)
  .component('flashContainer', flashContainer)
  .component('conversions', conversions)
