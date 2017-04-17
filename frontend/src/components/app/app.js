import './app.css'

import { CONVERSION_EVENTS } from '../conversions/conversions'

const API_URL = process.env.API_URL

class AppCtrl {
  constructor($http, $rootScope) {
    this.$http = $http
    this.$rootScope = $rootScope
    this.flashMessages = [
      { icon: 'check', content: "PDF #2 finished" },
      { icon: 'repeat', content: "HTML #1 finished" },
      { icon: 'info', content: "PDF #6 started" },
    ]
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
