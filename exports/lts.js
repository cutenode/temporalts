const moment = require('moment')
const buildPercentage = require('../helpers/percentage')
const fetchSchedule = require('../helpers/fetchSchedule')

async function buildData (version) {
  try {
    const data = await fetchSchedule('https://raw.githubusercontent.com/nodejs/Release/master/schedule.json')

    const restructure = {}

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

    if (version) {
      if (restructure[version] === undefined) {
        const error = new Error('The version you passed is not in the dataset. Please ensure that the version you passed is a valid Node.js version that is not super far in the future and has a \'v\' before it.')

        throw error
      }

      return restructure[version]
    }

    return restructure
  } catch (error) {
    console.log('There was an error in the called URL. Please ensure the URL is correct. Here\'s the full error:\n\n', error)
  }
}

module.exports = buildData
