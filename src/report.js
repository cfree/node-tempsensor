const fetch = require('node-fetch');

function reportTemp(temp, threshold, timestamp) {
  return fetch(`${process.env.REPORT_URL}?temp=${temp}&threshold=${threshold}&timestamp=${timestamp}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(`Reported: ${temp}deg F at ${timestamp}. Message: ${data}`);
      return data;
    })
    .catch(console.error);
}

module.exports = {
  reportTemp,
};
