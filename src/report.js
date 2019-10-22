const fetch = require('node-fetch');
const { zonedTimeToUtc } = require('date-fns-tz');

function reportTemp(temp, threshold, timestamp) {
  const utcTime = zonedTimeToUtc(timestamp, 'America/Denver');

  return fetch(`${process.env.REPORT_URL}/report?temp=${temp}&threshold=${threshold}&timestamp=${utcTime.valueOf()}`)
    .then(() => {
      console.log(`Temperature report triggered: ${temp}deg F at ${timestamp}`);
    });
}

function reportStatus(temp, threshold, timestamp, triggerCount) {
  const utcTime = zonedTimeToUtc(timestamp, 'America/Denver');

  return fetch(`${process.env.REPORT_URL}/status?temp=${temp}&threshold=${threshold}&timestamp=${utcTime.valueOf()}&triggerCount=${triggerCount}`)
    .then(() => {
      console.log(`Status report sent: ${temp}deg F at ${timestamp}`);
    });
}

module.exports = {
  reportTemp,
  reportStatus,
};
