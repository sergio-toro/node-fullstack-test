import './flashContainer.css'

class FlashContainerCtrl {
  constructor($scope) {
    this.$scope = $scope
  }

  $onInit() {
    const ctrl = this
    this.flashMessages = []

    this.$scope.$on('flash-created', (event, data) => {
      this.flashMessages.push(data)
      setTimeout(() => {
        this.flashMessages = this.flashMessages.filter(item => {
          return item._id !== data._id
        })
        this.$scope.$apply()
      }, 5000)
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
