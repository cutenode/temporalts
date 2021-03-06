# temporalts

temporalts is a module that leverages [Moment](https://www.npmjs.com/package/moment) (apologies, Maggie!) and the [schedule.json](https://github.com/nodejs/Release/blob/master/schedule.json) file published in the Node.js Release WG repo to generate temporal information about Node.js release lines.

## Installation

```
npm install temporalts
```

## Usage

temporalts can pass all Node.js LTS release line temporal information, or the temporal information for a _specific_ release line.

### `temporalts()`

Returns `Promise<Object>` -  an object where each key is the name of a release line and the property of each key is an object that includes several instances of Moment and some additional useful information that is derived from those instances of Moment.

Example:
```js
const temporalts = require('temporalts')

async function timeUntilEachLineGoesEOL() {
  const lts = await temporalts()

    for (let [key, ltsTime] of Object.entries(lts)) {
      console.log(`One percent of the Node.js ${key} LTS release line's lifespan is ${ltsTime.onePercentOfLTSLifeSpanInDays} days.`)
    }
}

timeUntilEachLineGoesEOL()
```

### `temporalts(version)` (release line temporal information for `version`)

* `version` String - A string representing a maintained release line format. Must be in a recognizable version format, or an error will be thrown.
  * Valid examples for Node.js' `v12` release line would include: `v12`, `12`, `v12.x`, `12.x.y`, `12.x`, or `v12.x.y`.

Returns `Promise<Object>` - resolves an Object containing the following properties:
  - `now`: An instance of `moment()` which is the current moment in time.
  - `timeframeStart`: An instance of `moment` that is the beginning of the LTS window of a given release's lifespan.
    - **Important:** This is *not* the original release of the LTS release line as Current, but rather the moment it moved from Current to LTS.
  - `timeframeEnd`: An instance of `moment` that is the moment a given release line goes End of Life (EOL).
  - `diffStartAndEnd`: Difference (in milliseconds) between `timeframeStart` and `timeframeEnd`.
  - `diffNowAndStart`: Difference (in milliseconds) between `now` and `timeframeStart`.
  - `diffNowAndEnd`: Difference (in milliseconds) between `now` and `timeframeEnd`.
  - `onePercentOfLTSLifeSpanInMilliseconds`: A calculation (in milliseconds) of 1% of the lifespan of a given release.
  - `onePercentOfLTSLifeSpanInDays`: A calculation (in days) of 1% of the lifespan of a given release.
  - `currentPercentOfLTSLifeSpan`: Gives the raw (including decimal) percentage of time that has passed from the beginning to the end of a given release's LTS lifespan.
  - `currentPercentOfLTSLifeSpanWithoutDecimal`: Gives the more human-friendly (exclusing decimal) percentage of time that has passed from the beginning to the end of a given release's LTS lifespan.
  - `currentPercentOfLTSLifeSpanAsProgressBar`: Proives a progress bar (using the charachters `[`, `=`, ` `, and `]`) that shows the current progress of a given release's lifespan in a visual format.
  - `fromNowToEnd`: Human-readable time from now to the end of the LTS window.
  - `fromLTSStartToNow`: Human-readable time from the start of the LTS window to now.

Below is an example of **of one entry**. You will get several of these as properties of their respective versions as keys if you execute the module without passing a version.

```json
{
    "now": "2020-01-02T03:44:02.171Z",
    "timeframeStart": "2018-10-30T04:00:00.000Z",
    "timeframeEnd": "2021-04-30T04:00:00.000Z",
    "diffStartAndEnd": 78883200000,
    "diffNowAndStart": 37064642171,
    "diffNowAndEnd": 41818557829,
    "onePercentOfLTSLifeSpanInMilliseconds": 788832000,
    "onePercentOfLTSLifeSpanInDays": 9.13,
    "currentPercentOfLTSLifeSpan": 46.98673757023042,
    "currentPercentOfLTSLifeSpanWithoutDecimal": 46,
    "currentPercentOfLTSLifeSpanAsProgressBar": "[=========           ]",
    "fromNowToEnd": "in a year",
    "fromLTSStartToNow": "a year ago"
}
```   

- You must only pass versions that map to an LTS release line. In Node.js, all even versions were, are, or will be LTS release lines.
- Data will only be returned for versions that exist in the [`schedule.json`](https://github.com/nodejs/Release/blob/master/schedule.json) file the Node.js Release WG maintains.
  - Generally, this is 1 LTS ahead of the currently published version that _is_ or _will be_ an LTS version.

Example:
```js
const temporalts = require('../')

async function prettyPrint () {
  const version = 'v12'
  const data = await temporalts(version)

  const percentDecimal = data.currentPercentOfLTSLifeSpanWithoutDecimal
  const percentProgress = data.currentPercentOfLTSLifeSpanAsProgressBar
  console.log(`We are ${percent}% through the lifespan of the Node.js ${version} LTS release line.\n`)
  console.log(percentProgress)
}

prettyPrint()
```

