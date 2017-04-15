import angular from 'angular'
import socketClient from 'socket.io-client'
// import angularAsyncAwait from 'angular-async-await'

import 'normalize'
import 'flexboxgrid'
import 'fontawesome'
import './app.css'

import statusTag from './components/statusTag/statusTag'
import tag from './components/tag/tag'
import flashMessage from './components/flash/flashMessage'
import flashContainer from './components/flash/flashContainer'
import conversions from './components/conversions/conversions'

const SOCKET_URL = process.env.SOCKET_URL
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

  async onNewConversion(type) {
    try {
      const { data } = await this.$http.post(`${API_URL}/conversion`, { type })

      this.$rootScope.$broadcast('conversion-created', data)

      console.log('DATA', data)
    } catch (error) {
      console.log('FAIL', error)
    }
  }
}

const app = {
  template: require('./app.html'),
  controller: AppCtrl,
}


const MODULE_NAME = 'app'

angular
  .module(MODULE_NAME, [])
  .component('app', app)
  .component('statusTag', statusTag)
  .component('tag', tag)
  .component('flashMessage', flashMessage)
  .component('flashContainer', flashContainer)
  .component('conversions', conversions)
  .run(($rootScope) => {
    console.log('hello', SOCKET_URL)

    const socket = socketClient(SOCKET_URL)

    socket.on('connect', function(params){
      console.log('Socket connected', params)
    })
    socket.on('event', function(data){
      console.log('Socket event', data)
    })
    socket.on('list-state', function(data){
      console.log('Socket list-state', data)
    })
    socket.on('disconnect', function(params){
      console.log('Socket disconnect', params)
    })
  })
  // .config(function($compileProvider) {
  //   $compileProvider.preAssignBindingsEnabled(true);
  // })

export default MODULE_NAME
