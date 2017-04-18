import './conversions.css'
import CONVERSION_EVENTS from './events'

const API_URL = process.env.API_URL

class ConversionCtrl {
  constructor($http, $scope) {
    this.$http = $http
    this.$scope = $scope
  }

  $onInit() {
    const ctrl = this
    this.conversionsList = []

    this.$http.get(`${API_URL}/conversion-list`)
      .then(({ data }) => {
        this.conversionsList = data
      })
      .catch((error) => console.error('ERROR', error))

    this.$scope.$on(CONVERSION_EVENTS.CREATED, (e, data) => {
      this.conversionsList.push(data)
    })

    this.$scope.$on(CONVERSION_EVENTS.UPDATED, (e, data) => {
      this.conversionsList = this.conversionsList
        .map(item => item._id === data._id ? data : item)
    })
  }
}

export default {
  template: require('./conversions.html'),
  controller: ConversionCtrl,
}
