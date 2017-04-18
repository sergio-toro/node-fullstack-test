export const MODULE_NAME = 'app.services'

import realTime from './realTime'

export default angular
  .module(MODULE_NAME, [
    realTime.name,
  ])
