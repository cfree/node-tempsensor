const fetch = require('node-fetch');
const { zonedTimeToUtc } = require('date-fns-tz');

function reportTemp(temp, threshold, timestamp) {
  const utcTime = zonedTimeToUtc(timestamp.toString(), 'America/Denver');

  return fetch(`${process.env.REPORT_URL}/report?temp=${temp}&threshold=${threshold}&timestamp=${utcTime.valueOf()}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(`Temperature report triggered: ${temp}deg F at ${timestamp}. Message: ${data}`);
      return data;
    })
    .catch(console.error);
}

function reportStatus(temp, threshold, timestamp, triggerCount) {
  const utcTime = zonedTimeToUtc(timestamp.toString(), 'America/Denver');

  return fetch(`${process.env.REPORT_URL}/status?temp=${temp}&threshold=${threshold}&timestamp=${utcTime.valueOf()}&triggerCount=${triggerCount}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(`Status report sent: ${temp}deg F at ${timestamp}. Message: ${data}`);
      return data;
    })
    .catch(console.error);
}

module.exports = {
  reportTemp,
  reportStatus,
};
