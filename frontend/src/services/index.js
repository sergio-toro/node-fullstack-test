const MODULE_NAME = 'app.services'

import RealTimeConversions from './realTime/RealTimeConversions'

export default angular
  .module(MODULE_NAME, [])
  .service('realTimeConversions', RealTimeConversions)
