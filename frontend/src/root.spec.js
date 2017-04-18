import rootModule, { MODULE_NAME } from './root';

describe('rootModule', () => {
  it('exported MODULE_NAME should match module.name', () => {
    expect(MODULE_NAME).toBe(rootModule.name)
  })
})
