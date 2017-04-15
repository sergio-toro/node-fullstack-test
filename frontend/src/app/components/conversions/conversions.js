import './conversions.css'

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
      .then(({ data}) => {
        this.conversionsList = data
      })
      .catch((error) => console.error('ERROR', error))

    this.$scope.$on('conversion-created', (event, data) => {
      this.conversionsList.push(data)
      this.$scope.$apply()
    })
  }
}

export default {
  template: require('./conversions.html'),
  controller: ConversionCtrl,
}
