import App from './app'
import Conversions from './conversions'
import Flash from './flash'
import StatusTag from './statusTag'
import Tag from './tag'

const MODULE_NAME = 'app.components'

export default angular
  .module(MODULE_NAME, [
    App.name,
    Conversions.name,
    Flash.name,
    StatusTag.name,
    Tag.name,
  ])
