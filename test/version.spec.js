const assert = require('assert')
const { parseVersion } = require('../helpers/version')

describe('parseVersion(version)', () => {
  it('throws an error for badly formed versions', () => {
    const badVersion = 'i-am-a-bad-version'
    assert.throws(() => {
      parseVersion(badVersion)
    }, /^Error: i-am-a-bad-version is not in an acceptable format$/)
  })

  it(`returns 'all' when 'all' is passed`, () => {
    const parsed = parseVersion('all')
    assert.equal(parsed, 'all')
  })

  it('correctly sanitizes valid versions', () => {
    const versions = ['v12', '12', 'v12.x', '12.x', 'v12.x.y', '12.x.y']
    for (const version of versions) {
      const sanitized = parseVersion(version)
      assert.equal(sanitized, 'v12')
    }
  })
})
