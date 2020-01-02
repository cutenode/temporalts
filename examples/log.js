const lts = require('../')

async function log () {
    const builtData = await lts()

    for (let [key, ltsTime] of Object.entries(builtData)) {
        if(!(ltsTime.currentPercentOfLTSLifeSpan >= 100) && !(ltsTime.currentPercentOfLTSLifeSpan <= 0)) { // only log the currently active LTS release lines - comment out or remove this if block if you want all active lines
            console.log(`Data for Node.js ${key}:\nMilliseconds from now to end: ${ltsTime.diffNowAndEnd}\nMilliseconds from start to end: ${ltsTime.diffStartAndEnd}\nOne percent of the LTS Lifespan (Milliseconds): ${ltsTime.onePercentOfLTSLifeSpanInMilliseconds}\nOne Percent of the LTS Lifespan (Days): ${ltsTime.onePercentOfLTSLifeSpanInDays}\nCurrent percentage through the version's lifespan: ${ltsTime.currentPercentOfLTSLifeSpan}%\nCurrent percentage through the version's lifespan (without extra long decimals): ${ltsTime.currentPercentOfLTSLifeSpanWithoutDecimal}%\nCurrent percentage through the version's lifespan (as progress bar): ${ltsTime.currentPercentOfLTSLifeSpanAsProgressBar}\nHuman-friendly timefrom now to end: ${ltsTime.fromNowToEnd}\nHuman-friendly time from start to now: ${ltsTime.fromLTSStartToNow}\n`)   
        }
    }
}

log()