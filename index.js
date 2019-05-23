const getTempSensorData = require('./data.js');
const reportTemp = require('./report.js');
const { hasMinimumTimeElapsed } = require('./utils.js');

const [,, reportTempInF = 35, measurementFrequencyInMs = 5000, reportFrequencyInMs = (1000 * 60 * 60)] = process.argv;

let prevTemp;
let count = 1;
let lastReportTime;

console.log(`Report temperature: ${reportTempInF}deg and below`);
console.log(`Measurement frequency: ${measurementFrequencyInMs}ms`);
console.log(`Report frequency: ${reportFrequencyInMs}ms`);
console.log(`---------------------------------`);

function loop() {
  console.log(`${count} read${count !== 1 ? 's' : ''}`);
    
  const currentTemp = getTempSensorData();
    
  if (currentTemp <= reportTempInF && hasMinimumTimeElapsed(lastReportTime, reportFrequencyInMs)) {
    lastReportTime = new Date();
    reportTemp(currentTemp, lastReportTime.toISOString());
  }
    
  count++;
  
  return setTimeout(loop, measurementFrequencyInMs);
}
  
return loop();
