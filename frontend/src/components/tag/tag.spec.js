import tagModule, { MODULE_NAME } from './';

describe('module: tag', () => {
  it('exported MODULE_NAME should match module.name', () => {
    expect(MODULE_NAME).toBe(tagModule.name)
  })

  describe('component controller: tag', () => {
    let $componentController

    beforeEach(angular.mock.module(MODULE_NAME))
    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_
    }))

    it('should expose a `content` property with null', function() {
       const ctrl = $componentController('tag', null, { content: null })

       expect(ctrl.content).toBeDefined()
       expect(ctrl.content).toBe(null)
     })

    it('should expose a `content` property', function() {
       const ctrl = $componentController('tag', null, { content: '12345' })

       expect(ctrl.content).toBeDefined()
       expect(ctrl.content).toBe('12345')
     })
  })

  describe('component template: tag', () => {
    beforeEach(angular.mock.module(MODULE_NAME))

    let element
    let scope
    beforeEach(inject(function($rootScope, $compile){
      scope = $rootScope.$new()
      element = angular.element('<tag content="outside"></tag>')
      element = $compile(element)(scope)
    }))

    it('should render the text', function() {
      scope.outside = 'HTML'
      scope.$apply()
      const snapshot = `<span class="tag ng-binding">\n      HTML\n    </span>`
      expect(element.html().trim()).toBe(snapshot)
    })

    it('should render the text', function() {
      scope.outside = 'PDF'
      scope.$apply()
      const snapshot = `<span class="tag ng-binding">\n      PDF\n    </span>`
      expect(element.html().trim()).toBe(snapshot)
    })
  })
})
