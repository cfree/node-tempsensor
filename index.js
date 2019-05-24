const { getSensors, getTemperature } = require('./data.js');
const reportTemp = require('./report.js');
const { hasMinimumTimeElapsed } = require('./utils.js');

const [,, reportTempInF = 35, measurementFrequencyInMs = 5000, reportFrequencyInMs = (1000 * 60 * 60)] = process.argv;

let prevTemp;
let count = 1;
let lastReportTime;
const [serialNum] = getSensors();

console.log(`Temp Sensor: ${serialNum}`);
console.log(`Report temperature: ${reportTempInF}deg F and below`);
console.log(`Measurement frequency: ${measurementFrequencyInMs}ms`);
console.log(`Report frequency: ${reportFrequencyInMs}ms`);
console.log(`---------------------------------`);

function loop() {    
  const { fahrenheit: currentTemp } = getTemperature(serialNum);
    
  console.log(`Read ${count}: ${currentTemp}deg F`);
    
  if (currentTemp <= reportTempInF && hasMinimumTimeElapsed(lastReportTime, reportFrequencyInMs)) {
    lastReportTime = new Date();
    reportTemp(currentTemp, lastReportTime.toISOString());
  }
    
  count++;
  
  return setTimeout(loop, measurementFrequencyInMs);
}
  
return loop();
