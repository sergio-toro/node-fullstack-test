import angular from 'angular'
import io from 'socket.io-client'
import Components from './components'

import 'normalize'
import 'flexboxgrid'
import 'fontawesome'
import './root.css'

const SOCKET_URL = process.env.SOCKET_URL
const API_URL = process.env.API_URL
const MODULE_NAME = 'root'

export default angular
  .module(MODULE_NAME, [
    Components.name,
  ])

  .run(($rootScope) => {
    const socket = io(SOCKET_URL)

    socket.on('connect', () => {
      console.log('Socket connected')
    })
    socket.on('conversion-updated', (data) => {
      console.log('Socket conversion-updated', data)
      const getIconFromStatus = (status) => {
        return status === 'processed' ? 'check' : 'info'
      }
      const getDescription = ({ name, status }) => {
        if (status === 'processed') {
          return `Request '${name}' processed`
        }
        return `Request '${name}' started processing`
      }
      $rootScope.$apply(() => {
        $rootScope.$broadcast('conversion-updated', data)
        $rootScope.$broadcast('flash-created', {
          id: data._id,
          icon: getIconFromStatus(data.status),
          content: getDescription(data),
        })
      })
    })
    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })
  })
