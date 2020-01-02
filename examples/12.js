const lts = require('../')

async function log () {
    const version = 'v12'
    const data = await lts(version)

    console.log()
    console.log(`We are ${data.currentPercentOfLTSLifeSpanWithoutDecimal}% through the lifespan of the Node.js ${version} LTS release line.\n${data.currentPercentOfLTSLifeSpanAsProgressBar} `)
    console.log()
}

log()