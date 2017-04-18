import conversionsModule, { MODULE_NAME } from './'
import { CONVERSION_EVENTS } from '../conversions'

const API_URL = process.env.API_URL

describe('module: conversions', () => {
  it('exported MODULE_NAME should match module.name', () => {
    expect(MODULE_NAME).toBe(conversionsModule.name)
  })

  describe('component controller: conversions', () => {
    let $componentController
    let $rootScope
    let $httpBackend

    beforeEach(angular.mock.module(MODULE_NAME))
    beforeEach(inject(function(_$componentController_, _$rootScope_, _$httpBackend_) {
      $componentController = _$componentController_
      $rootScope = _$rootScope_
      $httpBackend = _$httpBackend_

      $httpBackend.when('POST', `${API_URL}/conversion`)
        .respond(function(method, url, data, headers, params) {
          const { type } = JSON.parse(data)
          return [200, {
            _id: 5,
            name: `${type.toUpperCase()} #1`,
            type: type,
            status: "processing",
            createdAt: "2017-04-18T09:02:36.412Z"
          }]
        })
    }))

    it('should create and broadcast new pdf conversion', function() {
      $httpBackend.expectPOST(`${API_URL}/conversion`)
      const scope = $rootScope.$new()
      const ctrl = $componentController('app', { $scope: scope })

      spyOn($rootScope, "$broadcast")

      const type = 'pdf'
      const response = {
        _id: 5,
        name: `${type.toUpperCase()} #1`,
        type: type,
        status: "processing",
        createdAt: "2017-04-18T09:02:36.412Z"
      }

      ctrl.onNewConversion(type)
      $httpBackend.flush()
      expect($rootScope.$broadcast).toHaveBeenCalledWith(
        CONVERSION_EVENTS.CREATED,
        response,
      )
    })

    it('should create and broadcast new html conversion', function() {
      $httpBackend.expectPOST(`${API_URL}/conversion`)
      const scope = $rootScope.$new()
      const ctrl = $componentController('app', { $scope: scope })

      spyOn($rootScope, "$broadcast")

      const type = 'html'
      const response = {
        _id: 5,
        name: `${type.toUpperCase()} #1`,
        type: type,
        status: "processing",
        createdAt: "2017-04-18T09:02:36.412Z"
      }

      ctrl.onNewConversion(type)
      $httpBackend.flush()
      expect($rootScope.$broadcast).toHaveBeenCalledWith(
        CONVERSION_EVENTS.CREATED,
        response,
      )
    })

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
  })

  describe('component template: app', () => {
    beforeEach(angular.mock.module(MODULE_NAME))

    let $rootScope
    let element
    let scope

    beforeEach(inject(function(_$rootScope_, $compile){
      $rootScope = _$rootScope_

      scope = $rootScope.$new()
      element = angular.element(`<app></app>`)
      element = $compile(element)(scope)
    }))

    it('should render app', function() {
      const snapshot = `<div class="app">\n  <header class="app-header">\n    <div class="row">\n      <div class="col-xs-4">\n        <h1 class="app-title">Conversions</h1>\n      </div>\n      <div class="col-xs app-text-right">\n        <button class="app-button" ng-click="$ctrl.onNewConversion('pdf')">\n          New PDF Conversion\n        </button>\n        <button class="app-button" ng-click="$ctrl.onNewConversion('html')">\n          New HTML Conversion\n        </button>\n      </div>\n    </div>\n  </header>\n\n  <conversions></conversions>\n\n  <flash-container></flash-container>\n</div>`
      expect(element.html().trim()).toBe(snapshot)
    })
  })
})
