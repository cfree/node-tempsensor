const fetch = require('node-fetch');

function reportTemp(temp, threshold, timestamp) {
  return fetch(`${process.env.REPORT_URL}/report?temp=${temp}&threshold=${threshold}&timestamp=${timestamp}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(`Temperature report triggered: ${temp}deg F at ${timestamp}. Message: ${data}`);
      return data;
    })
    .catch(console.error);
}

function reportStatus(temp, threshold, timestamp, triggerCount) {
  return fetch(`${process.env.REPORT_URL}/status?temp=${temp}&threshold=${threshold}&timestamp=${timestamp}&triggerCount=${triggerCount}`)
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
