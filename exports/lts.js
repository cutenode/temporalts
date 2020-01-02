const moment = require('moment')
const { buildPercentage } = require('../helpers/percentage')
const { parseVersion } = require('../helpers/version')
const { fetchSchedule } = require('../helpers/fetchSchedule')

async function buildData (version = 'all') {
  const versionDataURL = 'https://raw.githubusercontent.com/nodejs/Release/master/schedule.json'
  try {
    const data = await fetchSchedule(versionDataURL)

    const restructure = {}
    const releaseVersion = parseVersion(version)

    for (const [key, value] of Object.entries(data)) {
      if (value.lts !== undefined) {
        const ltsTime = {}

        ltsTime.now = moment()
        ltsTime.timeframeStart = moment(value.lts)
        ltsTime.timeframeEnd = moment(value.end)

        ltsTime.diffStartAndEnd = ltsTime.timeframeEnd.diff(ltsTime.timeframeStart)
        ltsTime.diffNowAndStart = ltsTime.now.diff(ltsTime.timeframeStart)
        ltsTime.diffNowAndEnd = ltsTime.timeframeEnd.diff(ltsTime.now)

        ltsTime.onePercentOfLTSLifeSpanInMilliseconds = ltsTime.diffStartAndEnd / 100
        ltsTime.onePercentOfLTSLifeSpanInDays = ltsTime.onePercentOfLTSLifeSpanInMilliseconds / 1000 / 60 / 60 / 24

        ltsTime.currentPercentOfLTSLifeSpan = ltsTime.diffNowAndStart / ltsTime.onePercentOfLTSLifeSpanInMilliseconds
        ltsTime.currentPercentOfLTSLifeSpanWithoutDecimal = Math.trunc(ltsTime.currentPercentOfLTSLifeSpan)

        ltsTime.currentPercentOfLTSLifeSpanAsProgressBar = await buildPercentage(ltsTime.currentPercentOfLTSLifeSpan)

        ltsTime.fromNowToEnd = ltsTime.timeframeEnd.fromNow()
        ltsTime.fromLTSStartToNow = ltsTime.timeframeStart.fromNow()

        restructure[key] = ltsTime
      }
    }

    if (releaseVersion === 'all') {
      return restructure
    } else {
      if (restructure[releaseVersion] === undefined) {
        throw new Error(`${releaseVersion} is not a valid maintained release line in Node.js.`)
      }
      return restructure[releaseVersion]
    }
  } catch (error) {
    console.error(`Unable to fetch data from ${versionDataURL}\n\n`, error)
  }
}

module.exports = buildData
