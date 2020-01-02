async function buildPercentage (decimal) {
  const start = '['
  const end = ']'

  let tens = ''
  let spaces = ''

  const futureResult = '[                    ]' // result to return if we've not yet started an LTS line
  const pastResult = '[====================]' // result to return if we've already passed an LTS line's EOL

  if (decimal > 100) { // this will be true once a release line is EOL
    return pastResult
  }

  if (decimal < 0) { // this will be true when we come across an LTS line that does not yet exist
    return futureResult
  }

  const oneFifthOfNumber = decimal / 5

  for (let i = 1; (i <= oneFifthOfNumber) && (i <= 20); i++) {
    tens = tens.concat('', '=')
  }

  for (let i = 20; (i >= oneFifthOfNumber) && (i >= 1); i--) { // inverse of the above
    spaces = spaces.concat('', ' ')
  }

  const result = `${start}${tens}${spaces}${end}` // build out the spaces and equals

  return result
}

module.exports = buildPercentage
