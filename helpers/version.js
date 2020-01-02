/**
 * Sanitizes a release line string in Node.js, and allows for passing
 * a version number in a variety of formats.
 * 
 * Examples (input -> output):
 * 'v12' -> 'v12'
 * '12' -> 'v12'
 * '12.x' -> 'v12'
 * 'v12.x' -> 'v12'
 * 'v12.x.y' -> 'v12'
 *
 * @param version - a raw string representing a release line in Node.js.
 * @returns a sanitized version string in e.g. 'v12' format
 */
function parseVersion (version) {
  if (version === 'all') return version

  // Return if the version is already in valid format (ex. v12)
  if (/^v[0-9]{2}$/.test(version)) return version

  // If the version is just a number (ex. 12), prepend a 'v'
  if (/^[0-9]{2}$/.test(version)) return `v${version}`

  // If version matches e.g. 12.x, v12.x, v12.x.y, or 12.x.y
  // pull out the version number and prepend with 'v'
  const match = version.match(/v?(\d{2})(.x|.x.y)/)
  if (match) return `v${match[1]}`

  throw new Error(`${version} is not in an acceptable format`)
}

module.exports.parseVersion = parseVersion
