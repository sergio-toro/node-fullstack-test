import './app.css'

import { CONVERSION_EVENTS } from '../conversions'

const API_URL = process.env.API_URL

class AppCtrl {
  constructor($http, $rootScope) {
    this.$http = $http
    this.$rootScope = $rootScope
  }

  onNewConversion(type) {
    const { $http, $rootScope } = this

    $http.post(`${API_URL}/conversion`, { type })
      .then(({ data }) => {
        $rootScope.$broadcast(CONVERSION_EVENTS.CREATED, data)
      })
      .catch((error) => {
        console.log('FAIL', error)
      })
  }
}

export default {
  template: require('./app.html'),
  controller: AppCtrl,
}
