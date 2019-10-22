const { getSensors, getTemperature } = require('./data');
const { reportTemp, reportStatus } = require('./report');
const { hasMinimumTimeElapsed } = require('./utils');
require('dotenv').config();

const [,, reportTempInF = 35, measurementFrequencyInMs = 5000, triggerReportFrequencyInMs = (1000 * 60 * 60), statusReportFrequencyInMs = (1000 * 60 * 24)] = process.argv;

let count = 1;
let triggerCount = 0;
let lastTriggerReportTime;
let lastStatusReportTime = null;
const [serialNum] = getSensors();

if (serialNum) {
  console.log(`Temp Sensor: ${serialNum}`);
  console.log(`Report temperature: ${reportTempInF}deg F and below`);
  console.log(`Measurement frequency: ${measurementFrequencyInMs}ms`);
  console.log(`Trigger Report frequency: ${triggerReportFrequencyInMs}ms`);
  console.log(`Status report frequency: ${statusReportFrequencyInMs}ms`);
  console.log(`---------------------------------`);

  function loop() {
    const { fahrenheit: currentTemp } = getTemperature(serialNum);

    console.log(`Read ${count}: ${currentTemp}deg F`);

    if (currentTemp) {
      if (currentTemp <= reportTempInF && hasMinimumTimeElapsed(lastTriggerReportTime, triggerReportFrequencyInMs)) {
        lastTriggerReportTime = new Date();
        reportTemp(currentTemp, reportTempInF, lastTriggerReportTime).then(() => {}).catch(console.error);
        triggerCount++;
      }

      if (typeof lastStatusReportTime === 'null' || hasMinimumTimeElapsed(lastStatusReportTime, statusReportFrequencyInMs)) {
        lastStatusReportTime = new Date();
        reportStatus(currentTemp, reportTempInF, lastStatusReportTime, triggerCount).then(() => {}).catch(console.error);
        triggerCount = 0;
      }

      count++;

      return setTimeout(loop, measurementFrequencyInMs);
    }

    return null;
  }

  return loop();
}
