import angular from 'angular'
import Components from './components'
import Services from './services'

import 'normalize'
import 'flexboxgrid'
import 'fontawesome'
import './root.css'

export const MODULE_NAME = 'root'

export default angular
  .module(MODULE_NAME, [
    Components.name,
    Services.name,
  ])
  .run((realTimeConversions) => {
    realTimeConversions.listen()
  })
