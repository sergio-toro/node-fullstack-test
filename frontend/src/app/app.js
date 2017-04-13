import angular from 'angular'
import socketClient from 'socket.io-client'

import 'normalize'
import 'flexboxgrid'
import 'fontawesome'
import 'app.css'

import statusTag from './components/statusTag/statusTag'
import tag from './components/tag/tag'
import flashMessage from './components/flash/flashMessage'
import flashContainer from './components/flash/flashContainer'

const SOCKET_URL = process.env.SOCKET_URL || 'ws://localhost:3500'

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: '$ctrl'
  }
};

class AppCtrl {
  constructor() {
    // this.footer = `Let's start :D`;
    this.flashMessages = [
      { icon: 'check', content: "PDF #2 finished" },
      { icon: 'repeat', content: "HTML #1 finished" },
      { icon: 'info', content: "PDF #6 started" },
    ]
  }
}

const MODULE_NAME = 'app'

angular
  .module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl)
  .component('statusTag', statusTag)
  .component('tag', tag)
  .component('flashMessage', flashMessage)
  .component('flashContainer', flashContainer)
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

export default MODULE_NAME
