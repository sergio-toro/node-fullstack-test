import flashModule, { MODULE_NAME } from './';

describe('module: flash', () => {
  it('exported MODULE_NAME should match module.name', () => {
    expect(MODULE_NAME).toBe(flashModule.name)
  })

  describe('component controller: flashMessage', () => {
    let $componentController

    beforeEach(angular.mock.module(MODULE_NAME))
    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_
    }))

    it('should expose a `icon` property with null', function() {
       const ctrl = $componentController('flashMessage', null, { icon: 'check' })

       expect(ctrl.icon).toBeDefined()
       expect(ctrl.icon).toBe('check')
     })

    it('should expose a `content` property', function() {
       const ctrl = $componentController('flashMessage', null, { content: 'Hola mundo!' })

       expect(ctrl.content).toBeDefined()
       expect(ctrl.content).toBe('Hola mundo!')
     })
  })

  describe('component template: flashMessage', () => {
    beforeEach(angular.mock.module(MODULE_NAME))

    let element
    let scope
    beforeEach(inject(function($rootScope, $compile){
      scope = $rootScope.$new()
      element = angular.element(`<flash-message icon="icon" content="content"></flash-message>`)
      element = $compile(element)(scope)
    }))

    it('should render "Hola"', function() {
      scope.icon = 'check'
      scope.content = 'Hola'
      scope.$apply()
      const snapshot = `<div class="flash-message">\n      <!-- ngIf: $ctrl.icon --><div class="flash-message-icon ng-scope" ng-if="$ctrl.icon">\n        <i class="fa fa-fw fa-check" aria-hidden="true"></i>\n      </div><!-- end ngIf: $ctrl.icon -->\n      <div class="flash-message-content ng-binding">\n        Hola\n      </div>\n    </div>`
      expect(element.html().trim()).toBe(snapshot)
    })

    it('should render "Hola mundo :)"', function() {
      scope.icon = 'beer'
      scope.content = 'Hola mundo :)'
      scope.$apply()
      const snapshot = `<div class="flash-message">\n      <!-- ngIf: $ctrl.icon --><div class="flash-message-icon ng-scope" ng-if="$ctrl.icon">\n        <i class="fa fa-fw fa-beer" aria-hidden="true"></i>\n      </div><!-- end ngIf: $ctrl.icon -->\n      <div class="flash-message-content ng-binding">\n        Hola mundo :)\n      </div>\n    </div>`
      expect(element.html().trim()).toBe(snapshot)
    })
  })
})
