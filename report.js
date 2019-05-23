const fetch = require('node-fetch');

function reportTemp(temp, timestamp) {
	console.log(`Reported: ${temp}deg F at ${timestamp}`);
}

module.exports = reportTemp;
