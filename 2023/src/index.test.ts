import { main } from './index'

describe('main', () => {
  it('should concatenate hello and argument', () => {
    expect(main('world')).toStrictEqual('hello world')
  })
  it('should use jest-extended', () => {
    expect(undefined).pass('should use jest extended')
  })
})
