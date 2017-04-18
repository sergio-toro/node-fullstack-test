import statusTagModule, { MODULE_NAME } from './';

describe('module: statusTag', () => {
  it('exported MODULE_NAME should match module.name', () => {
    expect(MODULE_NAME).toBe(statusTagModule.name)
  })

  describe('component controller: statusTag', () => {
    let $componentController

    beforeEach(angular.mock.module(MODULE_NAME))
    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_
    }))

    it('should expose a `status` property with null', function() {
       const ctrl = $componentController('statusTag', null, { status: null })

       expect(ctrl.status).toBeDefined()
       expect(ctrl.status).toBe(null)
     })

    it('should expose a `status` property', function() {
       const ctrl = $componentController('statusTag', null, { status: 'processed' })

       expect(ctrl.status).toBeDefined()
       expect(ctrl.status).toBe('processed')
     })
  })

  describe('component template: statusTag', () => {
    beforeEach(angular.mock.module(MODULE_NAME))

    let element
    let scope
    beforeEach(inject(function($rootScope, $compile){
      scope = $rootScope.$new()
      element = angular.element('<status-tag status="outside"></status-tag>')
      element = $compile(element)(scope)
    }))

    it('should render "processed" status', function() {
      scope.outside = 'processed'
      scope.$apply()
      const snapshot = `<div class="status-tag" ng-switch="" on="$ctrl.status">\n      <!-- ngSwitchWhen: processed --><span ng-switch-when="processed" class="ng-scope">\n        <i class="fa fa-fw fa-check" aria-hidden="true"></i> Processed\n      </span><!-- end ngSwitchWhen: -->\n      <!-- ngSwitchWhen: processing -->\n      <!-- ngSwitchDefault: -->\n    </div>`
      expect(element.html().trim()).toBe(snapshot)
    })

    it('should render "processed" status', function() {
      scope.outside = 'processing'
      scope.$apply()
      const snapshot = `<div class="status-tag" ng-switch="" on="$ctrl.status">\n      <!-- ngSwitchWhen: processed -->\n      <!-- ngSwitchWhen: processing --><span ng-switch-when="processing" class="ng-scope">\n        <i class="fa fa-fw fa-repeat" aria-hidden="true"></i> Processing\n      </span><!-- end ngSwitchWhen: -->\n      <!-- ngSwitchDefault: -->\n    </div>`
      expect(element.html().trim()).toBe(snapshot)
    })

    it('should render "unknown|queued" status', function() {
      scope.outside = 'PDF'
      scope.$apply()
      const snapshot = `<div class="status-tag" ng-switch="" on="$ctrl.status">\n      <!-- ngSwitchWhen: processed -->\n      <!-- ngSwitchWhen: processing -->\n      <!-- ngSwitchDefault: --><span ng-switch-default="" class="ng-scope">\n        <i class="fa fa-fw fa-clock-o" aria-hidden="true"></i> In Queue\n      </span><!-- end ngSwitchWhen: -->\n    </div>`
      expect(element.html().trim()).toBe(snapshot)
    })
  })
})
