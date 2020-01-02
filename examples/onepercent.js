temporalts = require('../')

async function timeUntilEachLineGoesEOL() {
  const lts = await temporalts()

    for (let [key, ltsTime] of Object.entries(lts)) {
      console.log(`One percent of the Node.js ${key} LTS release line's lifespan is ${ltsTime.onePercentOfLTSLifeSpanInDays} days.`)
    }
}

timeUntilEachLineGoesEOL()