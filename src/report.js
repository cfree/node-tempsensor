const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

function reportTemp(temp, threshold, timestamp) {
  const params = new URLSearchParams();
  params.append('temp', temp);
  params.append('threshold', threshold);
  params.append('timestamp', timestamp);

  return fetch(process.env.REPORT_URL, { body: params })
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
