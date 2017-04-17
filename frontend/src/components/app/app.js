import './app.css'

const API_URL = process.env.API_URL

class AppCtrl {
  constructor($http, $scope, $rootScope) {
    this.$http = $http
    this.$scope = $scope
    this.$rootScope = $rootScope
    this.flashMessages = [
      { icon: 'check', content: "PDF #2 finished" },
      { icon: 'repeat', content: "HTML #1 finished" },
      { icon: 'info', content: "PDF #6 started" },
    ]
  }

  onNewConversion(type) {
    this.$http
      .post(`${API_URL}/conversion`, { type })
      .then(({ data }) => {
        this.$rootScope.$broadcast('conversion-created', data)
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
