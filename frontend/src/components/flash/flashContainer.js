import './flashContainer.css'

export const FLASH_EVENTS = {
  CREATED: Symbol('flash-created'),
}
const REMOVE_MESSAGE_TIMEOUT = 5000


class FlashContainerCtrl {
  constructor($scope) {
    this.$scope = $scope
  }

  $onInit() {
    const { $scope } = this
    this.flashMessages = []

    $scope.$on(FLASH_EVENTS.CREATED, (event, data) => {
      this.flashMessages.push(data)

      setTimeout(() => {
        $scope.$apply(() => {
          this.removeFlashMessage(data._id)
        })
      }, REMOVE_MESSAGE_TIMEOUT)
    })
  }

  removeFlashMessage(id) {
    this.flashMessages = this.flashMessages.filter(item => {
      return item._id !== id
    })
  }
}

export default {
  template: `
    <div class="flash-container">
      <div
        class="flash-container-wrapper"
        ng-repeat="message in $ctrl.flashMessages"
      >
        <flash-message icon="message.icon" content="message.content" />
      </div>
    </div>
  `,
  controller: FlashContainerCtrl,
}
