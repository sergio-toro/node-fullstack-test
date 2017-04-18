import realTimeModule, { MODULE_NAME } from './'
import { CONVERSION_EVENTS } from '../../components/conversions'
import { FLASH_EVENTS } from '../../components/flash'
import { getIcon, getDescription } from '../../utils/conversions'

describe('service: realTimeModule', () => {
  it('exported MODULE_NAME should match module.name', () => {
    expect(MODULE_NAME).toBe(realTimeModule.name)
  })

  let $rootScope
  let realTimeConversions

  beforeEach(angular.mock.module(MODULE_NAME))
  beforeEach(inject(function(_realTimeConversions_, _$rootScope_) {
    $rootScope = _$rootScope_
    realTimeConversions = _realTimeConversions_
  }))

  it('should broadcast conversion update', function() {
    spyOn($rootScope, "$broadcast")

    const item = {"_id":"58f5d62cd9b82c0036797f27","name":"PDF #1","type":"pdf","status":"processing","__v":0,"createdAt":"2017-04-18T09:02:36.412Z"}
    realTimeConversions.onConversionUpdated(item)

    expect($rootScope.$broadcast).toHaveBeenCalledWith(
      CONVERSION_EVENTS.UPDATED,
      item,
    )
    expect($rootScope.$broadcast).toHaveBeenCalledWith(
      FLASH_EVENTS.CREATED,
      {
        id: item._id,
        icon: getIcon(item),
        content: getDescription(item),
      },
    )
  })
})
