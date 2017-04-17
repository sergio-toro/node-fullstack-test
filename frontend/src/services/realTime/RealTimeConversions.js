import io from 'socket.io-client'
import { getIcon, getDescription } from '../../utils/conversions'
import { CONVERSION_EVENTS } from '../../components/conversions/conversions'
import { FLASH_EVENTS } from '../../components/flash/flashContainer'

const SOCKET_URL = process.env.SOCKET_URL

export default class RealTimeConversions {
  constructor($rootScope) {
    this.$rootScope = $rootScope
  }

  listen() {
    const socket = io(SOCKET_URL)

    socket.on('connect', this.onConnect.bind(this))
    socket.on('conversion-updated', this.onConversionUpdated.bind(this))
    socket.on('disconnect', this.onDisconnect.bind(this))
  }

  onConnect() {
    console.log('Socket.io connected')
  }

  onDisconnect() {
    console.log('Socket.io disconnected')
  }

  onConversionUpdated(data) {
    const { $rootScope } = this
    console.log('Socket.io conversion-updated', data)

    $rootScope.$apply(() => {
      $rootScope.$broadcast(CONVERSION_EVENTS.UPDATED, data)
      $rootScope.$broadcast(FLASH_EVENTS.CREATED, {
        id: data._id,
        icon: getIcon(data),
        content: getDescription(data),
      })
    })

  }
}
