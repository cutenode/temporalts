const bent = require('bent')

const getJSON = bent('json')

async function fetchSchedule (url) {
  try {
    const data = await getJSON(url)

    return data
  } catch (error) {
    console.log('Fetching remote JSON failed for some reason. Here\'s the full error:', error)
  }
}

module.exports.fetchSchedule = fetchSchedule
