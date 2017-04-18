import conversionsModule, { MODULE_NAME, CONVERSION_EVENTS } from './'

const API_URL = process.env.API_URL

describe('module: conversions', () => {
  it('exported MODULE_NAME should match module.name', () => {
    expect(MODULE_NAME).toBe(conversionsModule.name)
  })

  describe('component controller: conversions', () => {
    let $componentController
    let $rootScope
    let $httpBackend

    const response = [{"_id":"58f5d62cd9b82c0036797f27","name":"PDF #1","type":"pdf","status":"processing","__v":0,"createdAt":"2017-04-18T09:02:36.412Z"},{"_id":"58f5d62dd9b82c0036797f28","name":"HTML #1","type":"html","status":"queued","__v":0,"createdAt":"2017-04-18T09:02:37.462Z"}]

    beforeEach(angular.mock.module(MODULE_NAME))
    beforeEach(inject(function(_$componentController_, _$rootScope_, _$httpBackend_) {
      $componentController = _$componentController_
      $rootScope = _$rootScope_
      $httpBackend = _$httpBackend_

      $httpBackend.when('GET', `${API_URL}/conversion-list`).respond(response)
    }))

    it('should fetch conversionsList', function() {
      $httpBackend.expectGET(`${API_URL}/conversion-list`)

      const ctrl = $componentController('conversions')
      ctrl.$onInit()

      $httpBackend.flush()
      expect(ctrl.conversionsList).toBeDefined()
      expect(ctrl.conversionsList.length).toBe(2)
      expect(ctrl.conversionsList).toEqual(response)
    })

    it('should push a new conversion', function() {
      $httpBackend.expectGET(`${API_URL}/conversion-list`)
      const scope  = $rootScope.$new()
      const ctrl = $componentController('conversions', { $scope: scope })
      ctrl.$onInit()

      $httpBackend.flush()

      const item = {"_id":"58f5d62dd9b82c0036797f28","name":"HTML #1","type":"html","status":"processed","__v":0,"createdAt":"2017-04-18T09:02:37.462Z"}
      $rootScope.$broadcast(CONVERSION_EVENTS.CREATED, item)
      const conversionsList = [ ...response, item ]

      expect(ctrl.conversionsList).toBeDefined()
      expect(ctrl.conversionsList.length).toBe(3)
      expect(ctrl.conversionsList).toEqual(conversionsList)
    })

    it('should update a conversion', function() {
      $httpBackend.expectGET(`${API_URL}/conversion-list`)
      const scope  = $rootScope.$new()
      const ctrl = $componentController('conversions', { $scope: scope })
      ctrl.$onInit()

      $httpBackend.flush()

      const item = {"_id":"58f5d62dd9b82c0036797f28","name":"HTML #1","type":"html","status":"processing","__v":0,"createdAt":"2017-04-18T09:02:37.462Z"}
      $rootScope.$broadcast(CONVERSION_EVENTS.UPDATED, item)
      const conversionsList = [ response[0], item ]

      expect(ctrl.conversionsList).toBeDefined()
      expect(ctrl.conversionsList.length).toBe(2)
      expect(ctrl.conversionsList).toEqual(conversionsList)
    })

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
  })

  describe('component template: conversions', () => {
    beforeEach(angular.mock.module(MODULE_NAME))

    let $httpBackend
    let $rootScope
    let element
    let scope

    const response = [{"_id":"58f5d62cd9b82c0036797f27","name":"PDF #1","type":"pdf","status":"processing","__v":0,"createdAt":"2017-04-18T09:02:36.412Z"},{"_id":"58f5d62dd9b82c0036797f28","name":"HTML #1","type":"html","status":"queued","__v":0,"createdAt":"2017-04-18T09:02:37.462Z"}]

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, $compile){
      $rootScope = _$rootScope_
      $httpBackend = _$httpBackend_

      $httpBackend.when('GET', `${API_URL}/conversion-list`).respond(response)
      $httpBackend.expectGET(`${API_URL}/conversion-list`)

      scope = $rootScope.$new()
      element = angular.element(`<conversions></conversions>`)
      element = $compile(element)(scope)

      $httpBackend.flush()
    }))

    it('should render conversionsList', function() {
      const snapshot = `<table class="conversions">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th width="150">Created At</th>\n      <th width="90">Type</th>\n      <th width="115">Status</th>\n    </tr>\n  </thead>\n  <tbody>\n    <!-- ngRepeat: item in $ctrl.conversionsList --><tr ng-repeat="item in $ctrl.conversionsList" class="ng-scope">\n      <td ng-bind="item.name" class="ng-binding">PDF #1</td>\n      <td class="ng-binding">Tue, Apr 18, 9:02AM</td>\n      <td>\n        <tag content="item.type | uppercase">\n      </tag></td>\n      <td>\n        <status-tag status="item.status">\n      </status-tag></td>\n    </tr><!-- end ngRepeat: item in $ctrl.conversionsList --><tr ng-repeat="item in $ctrl.conversionsList" class="ng-scope">\n      <td ng-bind="item.name" class="ng-binding">HTML #1</td>\n      <td class="ng-binding">Tue, Apr 18, 9:02AM</td>\n      <td>\n        <tag content="item.type | uppercase">\n      </tag></td>\n      <td>\n        <status-tag status="item.status">\n      </status-tag></td>\n    </tr><!-- end ngRepeat: item in $ctrl.conversionsList -->\n  </tbody>\n</table>`
      expect(element.html().trim()).toBe(snapshot)
    })

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
  })
})
