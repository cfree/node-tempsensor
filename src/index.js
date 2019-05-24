const { getSensors, getTemperature } = require('./data');
const { reportTemp } = require('./report');
const { hasMinimumTimeElapsed } = require('./utils');

const [,, reportTempInF = 35, measurementFrequencyInMs = 5000, reportFrequencyInMs = (1000 * 60 * 60)] = process.argv;

let count = 1;
let lastReportTime;
const [serialNum] = getSensors();

if (serialNum) {
  console.log(`Temp Sensor: ${serialNum}`);
  console.log(`Report temperature: ${reportTempInF}deg F and below`);
  console.log(`Measurement frequency: ${measurementFrequencyInMs}ms`);
  console.log(`Report frequency: ${reportFrequencyInMs}ms`);
  console.log(`---------------------------------`);

  function loop() {
    const { fahrenheit: currentTemp } = getTemperature(serialNum);

    console.log(`Read ${count}: ${currentTemp}deg F`);

    if (currentTemp) {
      if (currentTemp <= reportTempInF && hasMinimumTimeElapsed(lastReportTime, reportFrequencyInMs)) {
        lastReportTime = new Date();
        reportTemp(currentTemp, lastReportTime.toISOString());
      }

      count++;

      return setTimeout(loop, measurementFrequencyInMs);
    }

    return null;
  }

  return loop();
}
