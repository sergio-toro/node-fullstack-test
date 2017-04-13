import './flashContainer.css'

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
  controller: function() {
    var vm = this;
    console.log(vm); // May not yet be available!
    vm.$onInit = function() {
      console.log(vm.flashMessages); // Guaranteed to be available!
    }
  },
  bindings: {
    flashMessages: '='
  }
}
