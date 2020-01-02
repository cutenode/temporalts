const temporalts = require('../')

async function prettyPrint () {
  const version = 'v12'
  const data = await temporalts(version)

  console.log()
  console.log(`We are ${data.currentPercentOfLTSLifeSpanWithoutDecimal}% through the lifespan of the Node.js ${version} LTS release line.\n${data.currentPercentOfLTSLifeSpanAsProgressBar} `)
  console.log()
}

prettyPrint()
