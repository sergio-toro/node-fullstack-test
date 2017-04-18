import flashModule, { MODULE_NAME, FLASH_EVENTS } from './';

describe('module: flash', () => {
  it('exported MODULE_NAME should match module.name', () => {
    expect(MODULE_NAME).toBe(flashModule.name)
  })

  describe('component controller: flashContainer', () => {
    let $componentController
    let $rootScope

    beforeEach(angular.mock.module(MODULE_NAME))
    beforeEach(inject(function(_$componentController_, _$rootScope_) {
      $componentController = _$componentController_
      $rootScope = _$rootScope_
    }))

    it('should init `flashMessages` property', function() {
      const ctrl = $componentController('flashContainer')
      ctrl.$onInit()

      expect(ctrl.flashMessages).toBeDefined()
      expect(ctrl.flashMessages.length).toBe(0)
    })

    it('should render `flashMessages` on ', function() {
      const scope  = $rootScope.$new()
      const ctrl = $componentController('flashContainer', { $scope: scope })
      ctrl.$onInit()

      const item = { _id: 5, icon: 'beer', content: 'Hola Mundo :)'}
      $rootScope.$broadcast(FLASH_EVENTS.CREATED, item)

      expect(ctrl.flashMessages).toBeDefined()
      expect(ctrl.flashMessages.length).toBe(1)
      expect(ctrl.flashMessages[0]).toBe(item)
    })
  })

  describe('component template: flashContainer', () => {
    beforeEach(angular.mock.module(MODULE_NAME))

    let $rootScope
    let element
    let scope
    beforeEach(inject(function(_$rootScope_, $compile){
      $rootScope = _$rootScope_
      scope = $rootScope.$new()
      element = angular.element(`<flash-container></flash-container>`)
      element = $compile(element)(scope)
    }))

    it('should render emmited flash message', function() {
      const item = { _id: 5, icon: 'beer', content: 'Hola Mundo :)'}
      $rootScope.$broadcast(FLASH_EVENTS.CREATED, item)
      $rootScope.$apply()
      const snapshot = `<div class="flash-container">
      <!-- ngRepeat: message in $ctrl.flashMessages --><div class="flash-container-wrapper ng-scope" ng-repeat="message in $ctrl.flashMessages">\n        <flash-message icon="message.icon" content="message.content" class="ng-isolate-scope">\n    <div class="flash-message">\n      <!-- ngIf: $ctrl.icon --><div class="flash-message-icon ng-scope" ng-if="$ctrl.icon">\n        <i class="fa fa-fw fa-beer" aria-hidden="true"></i>\n      </div><!-- end ngIf: $ctrl.icon -->\n      <div class="flash-message-content ng-binding">\n        Hola Mundo :)\n      </div>\n    </div>\n  </flash-message></div><!-- end ngRepeat: message in $ctrl.flashMessages -->\n    </div>`
      expect(element.html().trim()).toBe(snapshot)
    })
  })

  describe('slow component template: flashContainer', () => {
    beforeEach(angular.mock.module(MODULE_NAME))

    let originalTimeout
    let $rootScope
    let element
    let scope
    beforeEach(inject(function(_$rootScope_, $compile){
      $rootScope = _$rootScope_
      scope = $rootScope.$new()
      element = angular.element(`<flash-container></flash-container>`)
      element = $compile(element)(scope)

      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000
    }))

    it('should clear flash message after 5seconds', function(done) {
      const item = { _id: 5, icon: 'beer', content: 'Hola Mundo :)'}
      $rootScope.$broadcast(FLASH_EVENTS.CREATED, item)
      $rootScope.$apply()
      const snapshot = `<div class="flash-container">\n      <!-- ngRepeat: message in $ctrl.flashMessages -->\n    </div>`

      setTimeout(() => {
        expect(element.html().trim()).toBe(snapshot)
        done()
      }, 5500)
    })

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })
  })
})
